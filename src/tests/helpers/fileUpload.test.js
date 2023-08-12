import { fileUpload } from "../../helpers/fileUpload";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "do8t1qxve",
  api_key: "766398186196915",
  api_secret: "At4_HVxmlQUZWGs7tYb4SM3sZD4",
  secure: true,
});

describe("Pruebas en fileUpload", () => {
  const IMG_URL =
    "https://www.datocms-assets.com/7756/1576840611-aptitude-test-1.png?auto=enhance%2Cformat&h=630&w=1200";
  test("debe de subir el archivo correctamente a cloudinary", async () => {
    const resp = await fetch(IMG_URL);

    const blob = await resp.blob();
    const file = new File([blob], "test-image.png");
    const url = await fileUpload(file);
    expect(typeof url).toBe("string");
    console.log(url);

    const segments = url.split("/");
    console.log(segments);
    const imgId = segments[segments.length - 1].replace(".png", "");
    console.log(imgId);

    const cloudRes = await cloudinary.api.delete_resources(
      ["journal-app/" + imgId],
      { resource_type: "image" }
    );
    console.log(cloudRes);
  });

  test("debe de retornar null", async () => {
    const file = new File([], "image.jpg");
    const url = await fileUpload(file);
    expect(url).toBeNull();
  });
});
