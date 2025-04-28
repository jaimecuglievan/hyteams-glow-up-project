
type WorkMode = "office" | "remote" | "traveling" | "vacation";

export const getWorkModeColor = (mode?: WorkMode): string => {
  switch (mode) {
    case "office":
      return "border-green-500";
    case "remote":
      return "border-red-500";
    case "traveling":
      return "border-blue-500";
    case "vacation":
      return "border-gray-400";
    default:
      return "border-transparent";
  }
};
