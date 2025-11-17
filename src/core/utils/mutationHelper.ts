export const handleMutation = async <T>(
  mutationFn: () => Promise<T>,
  resetForm?: () => void
): Promise<boolean> => {
  try {
    const res = await mutationFn();
    // اگر response دارای res.ok هست
    if (res && (res as any)?.ok) {
      resetForm?.();
      return true;
    }
    return false;
  } catch (error) {
    console.error("Mutation error:", error);
    return false;
  }
};
