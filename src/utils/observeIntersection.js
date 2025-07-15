
export default function observeIntersection(ref, callback) {
  if (!ref) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) callback();
    },
    { threshold: 0.5 }
  );

  observer.observe(ref);
  return () => observer.disconnect();
}
