import { useSpring, useTransform } from "framer-motion";

export default function useSmoothTransform(value, springOptions, transformer) {
  return useSpring(useTransform(value, transformer), springOptions);
}
