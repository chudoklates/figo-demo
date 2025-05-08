"use client";

import { PREPARE_FILE_UPLOAD, UPDATE_PARTICIPANT } from "@/api/mutations/user";
import { GET_MY_PARTICIPANTS } from "@/api/queries/users";
import { PrepareUploadData } from "@/api/types/misc";
import { ResultSnackbar } from "@/components";
import { UserContext } from "@/lib/context/UserContext";
import { useMutation } from "@apollo/client";
import { Avatar, Button, Stack } from "@mui/material";
import Image from "next/image";
import React, { ChangeEvent, useContext, useState } from "react";
import ImageBlobReduce from "image-blob-reduce";
import Pica from "pica";

const pica = Pica({ features: ["js", "wasm", "cib"] });
const reduce = new ImageBlobReduce({ pica });

export default function ProfileImageUpload() {
  const { user } = useContext(UserContext);

  const [snackbar, setSnackbar] = useState<"success" | "error" | null>(null);
  const [imgSrc, setImgSrc] = useState<string | undefined>(
    user?.profile_image?.url
  );
  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [prepareUpload] = useMutation<{ prepareFileUpload: PrepareUploadData }>(
    PREPARE_FILE_UPLOAD
  );
  const [updateParticipant] = useMutation<{ updateParticipant: Boolean }>(
    UPDATE_PARTICIPANT,
    { refetchQueries: [GET_MY_PARTICIPANTS] }
  );

  const profileImageField = user?.fields?.find(
    (field) => field.field_type.tech_name === "profile_image"
  );

  const allowedMimeTypes = (
    profileImageField?.field_type.input_options.allowed_types || [
      "JPG",
      "PNG",
      "JPEG",
    ]
  )
    .map((type) => {
      return `image/${type.toLowerCase()}`;
    })
    .join(", ");

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    setFile(files[0]);

    // Downscale the image to reduce pixelation
    const resizedBlob = await reduce.toBlob(files[0], { max: 128 });

    setBlob(resizedBlob);

    setImgSrc(URL.createObjectURL(resizedBlob));
  };

  const handleSubmitFile = async () => {
    try {
      if (!file) return;

      const { data } = await prepareUpload({
        variables: {
          file_name: file.name,
          type: "IMAGE",
          extension: file.type,
        },
      });

      if (!data) {
        throw new Error("Failed to prepare file upload");
      }

      const { id, upload_url } = data.prepareFileUpload;

      // Upload the file to the S3 bucket
      const response = await fetch(upload_url, {
        method: "PUT",
        body: blob,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      // Update the user's profile image
      const { data: result } = await updateParticipant({
        variables: {
          id: user?.id,
          fields: [
            {
              tech_name: profileImageField?.field_type.tech_name,
              value: {
                id_file: id,
              },
            },
          ],
        },
      });

      if (!result?.updateParticipant) {
        throw new Error("Failed to update participant data");
      }

      setSnackbar("success");
      setBlob(null);
      setFile(null);
    } catch (err) {
      setSnackbar("error");
    }
  };

  return (
    <React.Fragment>
      <ResultSnackbar
        snackbarOpen={snackbar !== null}
        closeSnackbar={() => setSnackbar(null)}
        severity={snackbar}
        message={
          snackbar === "success"
            ? "Bild erfolgreich hochgeladen"
            : "Fehler beim Hochladen des Bildes"
        }
      />
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
        }}
      >
        <Avatar sx={{ width: 100, height: 100, borderWidth: 3 }}>
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={user?.first_name || ""}
              fill
              sizes="100px"
              style={{ objectFit: "cover" }}
              quality={100}
              unoptimized
            />
          ) : null}
        </Avatar>
        <Stack direction="row" spacing={{ xs: 1, md: 3 }}>
          <Button variant="outlined" component="label">
            Neu hochladen
            <input
              type="file"
              accept={allowedMimeTypes}
              hidden
              onChange={handleChangeFile}
            />
          </Button>
          <Button
            variant="outlined"
            disabled={!file}
            onClick={handleSubmitFile}
          >
            Bild speichern
          </Button>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
