import React, {
  ChangeEvent,
  ClipboardEvent,
  useState,
  DragEvent,
  SyntheticEvent
} from "react";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import { InsertFilesFunction } from "./utilities";
import { TextArea } from "./TextArea";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

interface IProps {
  className?: string;
  insertFiles: InsertFilesFunction;
  onSubmit: () => Promise<void>;
  setText: (text: string) => void;
  text: string;
}

export const MarkdownTextArea = ({
  insertFiles,
  onSubmit,
  setText,
  text,
  ...restProps
}: IProps) => {
  const [uploadingFiles, setUploadingFiles] = useState(false);

  const uploadFiles = async (
    event: SyntheticEvent<HTMLTextAreaElement>,
    files: (File | null)[]
  ) => {
    const validFiles = files.filter((file): file is File => !!file);

    if (validFiles.length === 0) {
      return;
    }

    setUploadingFiles(true);

    setText(
      await insertFiles(text, event.currentTarget.selectionStart, validFiles)
    );

    setUploadingFiles(false);
  };

  if (uploadingFiles) {
    return (
      <LoaderContainer>
        <PulseLoader color="white" />
      </LoaderContainer>
    );
  }

  return (
    <TextArea
      onSubmit={onSubmit}
      placeholder="Write in Markdown ..."
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
        setText(event.target.value)
      }
      onDrop={(event: DragEvent<HTMLTextAreaElement>): Promise<void> =>
        uploadFiles(event, Array.from(event.dataTransfer.files))
      }
      onPaste={async (
        event: ClipboardEvent<HTMLTextAreaElement>
      ): Promise<void> => {
        if (!event.clipboardData || !event.clipboardData.items) {
          return;
        }

        await uploadFiles(
          event,
          Array.from(event.clipboardData.items).map(item => item.getAsFile())
        );
      }}
      value={text}
      {...restProps}
    />
  );
};
