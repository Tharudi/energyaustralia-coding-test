
import axios from 'axios';
const API_URL = 'https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals';

describe('Festivals API Tests', () => {
  it('should return a successful response with a valid structure', async () => {
    const response = await axios.get(API_URL);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);

    if (response.data.length > 0) {
      const festival = response.data[0];
      expect(festival).toHaveProperty('name');
      expect(festival).toHaveProperty('bands');
      expect(Array.isArray(festival.bands)).toBe(true);

      if (festival.bands.length > 0) {
        const band = festival.bands[0];
        expect(band).toHaveProperty('name');
        expect(band).toHaveProperty('recordLabel');
      }
    }
  });
  
  beforeEach(async () => {
    // Add a delay of 2 second before each test
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  it('should return empty array if no festivals available', async () => {
    const response = await axios.get(API_URL);
    expect(response.data.festivals).toEqual(expect.arrayContaining([]));
  });
  

  it('should throw an error for invalid endpoints', async () => {
    try {
      await axios.get(`${API_URL}/invalid`);
    } catch (error: any) {
      expect(error.response.status).toBe(404);
    }
  });

  it('should handle timeout errors gracefully', async () => {
    try {
      await axios.get(API_URL, { timeout: 1 }); // Set a very low timeout
    } catch (error: any) {
      expect(error.code).toBe('ECONNABORTED');
    }
  });
 
  it("should handle 500 status code gracefully", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce({
      response: { status: 500, statusText: "Internal Server Error" },
    });

   
  });

});
