import * as ImageManipulator from 'expo-image-manipulator';

// 1920px wide is more than enough for proof-of-delivery photos
const MAX_WIDTH = 1920;
// 0.5 quality produces ~300–600 KB for a typical 12 MP phone photo — well within 5 MB
const JPEG_QUALITY = 0.5;

export async function compressImage(uri: string): Promise<string> {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: MAX_WIDTH } }],
    { compress: JPEG_QUALITY, format: ImageManipulator.SaveFormat.JPEG },
  );
  return result.uri;
}
