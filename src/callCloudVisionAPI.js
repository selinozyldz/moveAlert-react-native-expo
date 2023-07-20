import axios from 'axios';

const API_KEY = "AIzaSyCFanWNtxUhY5qKften17l4mELLAMTeIWM"
// Cloud Vision API Anahtarınızı buraya ekleyin

const callCloudVisionAPI = async (imageUri) => {
  try {
    const response = await fetch(imageUri);
    const imageBlob = await response.blob();

    // Cloud Vision API'ye göndermek üzere fotoğrafı Base64'e dönüştür
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result.replace('data:image/jpeg;base64,', '');

      // Cloud Vision API'ye isteği gönder
      try {
        const apiResponse = await axios.post('https://vision.googleapis.com/v1/images:annotate', {
          requests: [
            {
              image: {
                content: base64Data,
              },
              features: [
                {
                  type: 'LABEL_DETECTION',
                  maxResults: 10,
                },
              ],
            },
          ],
        }, {
          params: {
            key: API_KEY,
          },
        });

        // API yanıtını kullanarak işlem yapabilirsiniz
        console.log(apiResponse.data); // Örneğin, API yanıtını konsola yazdırabilirsiniz
        // API yanıtını kullanarak fotoğrafı güncelleme işlemlerini yapabilirsiniz
        // ...

      } catch (error) {
        console.error(error);
      }
    };

    reader.readAsDataURL(imageBlob);
  } catch (error) {
    console.error(error);
  }
};

export default callCloudVisionAPI;
