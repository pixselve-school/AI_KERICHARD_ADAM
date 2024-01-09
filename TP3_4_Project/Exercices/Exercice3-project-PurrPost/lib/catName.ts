export default function generateCatName(text: string): string {
  // Basic hashing function to convert text into a number
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }

  // Array of cat names to choose from
  const catNames = [
    "Whiskers",
    "Shadow",
    "Simba",
    "Luna",
    "Bella",
    "Oliver",
    "Kitty",
    "Lucy",
    "Milo",
    "Nala",
  ];

  // Use the hash value to select a name
  const index = Math.abs(hash) % catNames.length;
  return catNames[index];
}
