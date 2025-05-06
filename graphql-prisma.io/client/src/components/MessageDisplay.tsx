import type { Message } from "../utils/types";
import { Branch } from "./Branch";

type MessageDisplayProps = {
  message: Message;
  index: number;
};

export const MessageDisplay = ({ message, index }: MessageDisplayProps) => {
  return (
    <div className="group mb-2 shrink-0 rounded-lg flex items-center drop-shadow-md bg-zinc-700 w-48 h-20 relative">
      <Branch trunk={index === 0} />
      <p className="text-sm text-gray-200 font-bold px-4">{message.body}</p>
    </div>
  );
};
