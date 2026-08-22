import React from "react";
import Typography from "./Typography";

const ToasErrorMessage = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <Typography variant="body">{title}</Typography>
      <Typography variant="caption">{description}</Typography>
    </div>
  );
};

export default ToasErrorMessage;
