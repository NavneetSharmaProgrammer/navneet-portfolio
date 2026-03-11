async function generateAESKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

// Helper to open IndexedDB
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("Portfolio3DModelCache", 1);
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("models")) {
        db.createObjectStore("models");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const decryptFile = async (
  url: string,
  password: string
): Promise<ArrayBuffer> => {
  try {
    const db = await openDB();
    const cacheKey = url; // Use the URL as the cache key
    
    // Check if decrypted model is already in IndexedDB
    const getCachedModel = new Promise<ArrayBuffer | undefined>((resolve, reject) => {
      const tx = db.transaction("models", "readonly");
      const store = tx.objectStore("models");
      const request = store.get(cacheKey);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    const cached = await getCachedModel;
    if (cached && cached.byteLength > 0) {
      console.log("Loading 3D Model securely from IndexedDB cache...");
      return cached;
    }

    // Not in cache, fetch and decrypt
    console.log("Fetching and decrypting 3D Model for the first time...");
    const response = await fetch(url);
    const encryptedData = await response.arrayBuffer();
    const iv = new Uint8Array(encryptedData.slice(0, 16));
    const data = encryptedData.slice(16);
    const key = await generateAESKey(password);
    const decryptedBuffer = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);

    // Save decrypted result to IndexedDB for next time
    const saveToCache = new Promise<void>((resolve, reject) => {
      const tx = db.transaction("models", "readwrite");
      const store = tx.objectStore("models");
      const request = store.put(decryptedBuffer, cacheKey);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    
    await saveToCache;
    return decryptedBuffer;

  } catch (err) {
    console.error("Cache/Decrypt error fallback:", err);
    // If anything goes wrong with IndexedDB, fallback to standard fetch/decrypt
    const response = await fetch(url);
    const encryptedData = await response.arrayBuffer();
    const iv = new Uint8Array(encryptedData.slice(0, 16));
    const data = encryptedData.slice(16);
    const key = await generateAESKey(password);
    return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
  }
};
