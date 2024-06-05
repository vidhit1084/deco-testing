const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const inpaintingUrl = "http://34.87.117.77:3061/gen-ai/inpainting";
const stylesUrl = "http://34.87.117.77:3061/gen-ai/styles";
const pollUrl = "http://34.87.117.77:3061/gen-ai/poll";
const arr = [];
const inpaintingAuth =
  "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNjOTNjMWEyNGNhZjgyN2I4ZGRlOWY4MmQyMzE1MzY1MDg4YWU2MTIiLCJ0eXAiOiJKV1QifQ.eyJIT01FREVDT1IiOnRydWUsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9oYW5kbGVyLTM4OTExMSIsImF1ZCI6ImhhbmRsZXItMzg5MTExIiwiYXV0aF90aW1lIjoxNzE2NzUzOTQ3LCJ1c2VyX2lkIjoiMk9ReDdDY2RPNk50d0h2NzB2MnU1WERlZmVIMyIsInN1YiI6IjJPUXg3Q2NkTzZOdHdIdjcwdjJ1NVhEZWZlSDMiLCJpYXQiOjE3MTY3NTM5NDcsImV4cCI6MTcxNjc1NzU0NywiZW1haWwiOiJ2aWRoaXRAbWV0YWRvbWUuYWkiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidmlkaGl0QG1ldGFkb21lLmFpIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.QGCdsRJaj8B4TRa6C1GGPFUrLqH4KHJhPrVO0xrSwnNBkPz58iU4fJCcqiVTYEzUFlai0UALe-7ie9jLv0sF1-IYeAGsxfMh9DZjKDGkgLEnfTriCQK3rZBEYKMEs23xOCtFRJ9KL-29GOrj8DPeJ7jWk0aZ393gaMnsIblQofzSs7tYSNoeLi1VxibcNGaq8PjJsrat-QV4A9Jv6WSZBcfoCcQ_Ed-VjulR5VBksAodx0vHQO3UDSD9mLJqIW1-L2VNLcx1MITjV8DlQSGml-5gA3yTjnauDygM8keCh9YafCSbyu_O16W2bmLKnXecvMd0zappzh7uVCU42P18mg";
const stylesAuth =
  "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNjOTNjMWEyNGNhZjgyN2I4ZGRlOWY4MmQyMzE1MzY1MDg4YWU2MTIiLCJ0eXAiOiJKV1QifQ.eyJIT01FREVDT1IiOnRydWUsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9oYW5kbGVyLTM4OTExMSIsImF1ZCI6ImhhbmRsZXItMzg5MTExIiwiYXV0aF90aW1lIjoxNzE2NzUzOTQ3LCJ1c2VyX2lkIjoiMk9ReDdDY2RPNk50d0h2NzB2MnU1WERlZmVIMyIsInN1YiI6IjJPUXg3Q2NkTzZOdHdIdjcwdjJ1NVhEZWZlSDMiLCJpYXQiOjE3MTY3NTM5NDcsImV4cCI6MTcxNjc1NzU0NywiZW1haWwiOiJ2aWRoaXRAbWV0YWRvbWUuYWkiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidmlkaGl0QG1ldGFkb21lLmFpIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.QGCdsRJaj8B4TRa6C1GGPFUrLqH4KHJhPrVO0xrSwnNBkPz58iU4fJCcqiVTYEzUFlai0UALe-7ie9jLv0sF1-IYeAGsxfMh9DZjKDGkgLEnfTriCQK3rZBEYKMEs23xOCtFRJ9KL-29GOrj8DPeJ7jWk0aZ393gaMnsIblQofzSs7tYSNoeLi1VxibcNGaq8PjJsrat-QV4A9Jv6WSZBcfoCcQ_Ed-VjulR5VBksAodx0vHQO3UDSD9mLJqIW1-L2VNLcx1MITjV8DlQSGml-5gA3yTjnauDygM8keCh9YafCSbyu_O16W2bmLKnXecvMd0zappzh7uVCU42P18mg";

const inpaintingForm = () => {
  const form = new FormData();
  form.append("prompt", "change wall color");
  form.append("num_inference_steps", "50");
  form.append("generator_seed", "100");
  form.append(
    "image",
    fs.createReadStream(
      "/Users/metadome-39/Desktop/deco-testing/Hyderabad20.jpg"
    )
  );
  form.append(
    "mask",
    fs.createReadStream(
      "/Users/metadome-39/Desktop/deco-testing/Hyderabad20_mask.png"
    )
  );
  return form;
};

const stylesForm = () => {
  const form = new FormData();
  form.append("distance_threshold", "0.1");
  form.append("a_prompt", "best quality, extremely detailed");
  form.append("prompt", "a professional interior living room");
  form.append("detect_resolution", "512");
  form.append("scale", "9");
  form.append("ddim_steps", "20");
  form.append("num_samples", "1");
  form.append("image_resolution", "512");
  form.append("eta", "0");
  form.append(
    "n_prompt",
    "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality"
  );
  form.append(
    "image",
    fs.createReadStream(
      "/Users/metadome-39/Desktop/deco-testing/Hyderabad20.jpg"
    )
  );
  form.append("value_threshold", "0.1");
  return form;
};

const makeApiCall = async (url, auth, form) => {
  try {
    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: auth,
      },
    });
    return response.data.processing_id;
  } catch (error) {
    console.error("Error making API call:", error);
    return null;
  }
};

const pollServer = async (processing_id, folder) => {
  try {
    const response = await axios.get(
      `${pollUrl}?id=${processing_id}&folder=${folder}`
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const startPolling = async (processing_id, folder) => {
  const startTime = Date.now();
  let result = null;

  while (!result) {
    result = await pollServer(processing_id, folder);
    if (result) {
      const endTime = Date.now();
      const totalTime = endTime - startTime;

      arr.push(Math.floor((totalTime / 1000) % 60));
      console.log(
        `Processing ID ${processing_id} completed in ${Math.floor(
          totalTime / 1000
        )} s`
      );
    } else {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before polling again
    }
  }
};

const runScalabilityTest = async () => {
  const processingIds = [];

  for (let i = 0; i < 40; i++) {
    // Adjust the number of iterations as needed
    const inpaintingFormInstance = inpaintingForm();
    const stylesFormInstance = stylesForm();

    const inpaintingProcessingId = await makeApiCall(
      inpaintingUrl,
      inpaintingAuth,
      inpaintingFormInstance
    );
    const stylesProcessingId = await makeApiCall(
      stylesUrl,
      stylesAuth,
      stylesFormInstance
    );

    if (inpaintingProcessingId) {
      processingIds.push({ id: inpaintingProcessingId, folder: "inpainting" });
      startPolling(inpaintingProcessingId, "inpainting");
    }

    if (stylesProcessingId) {
      processingIds.push({ id: stylesProcessingId, folder: "styles" });
      startPolling(stylesProcessingId, "styles");
    }
  }
  console.log(arr, "::time arr");
};

runScalabilityTest();
