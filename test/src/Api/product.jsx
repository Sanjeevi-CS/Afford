import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/test';

export const getProducts = async (company, category, top, minPrice, maxPrice) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/companies/${company}/categories/${category}/products`,
      {
        params: {
          top,
          minPrice,
          maxPrice
        },
        headers: {
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4MzUxOTMwLCJpYXQiOjE3MTgzNTE2MzAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjYyOGMyMDYwLTE2ZmEtNDE1Yi05NWQwLWUyOWUwOTIxMWYyYSIsInN1YiI6IjcyNzcyMWV1Y3MxMzRAc2tjZXQuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjYyOGMyMDYwLTE2ZmEtNDE1Yi05NWQwLWUyOWUwOTIxMWYyYSIsImNsaWVudFNlY3JldCI6InlKYml2d21LbmpMTVp4SVoiLCJvd25lck5hbWUiOiJTYW5qZWV2aSIsIm93bmVyRW1haWwiOiI3Mjc3MjFldWNzMTM0QHNrY2V0LmFjLmluIiwicm9sbE5vIjoiNzI3NzIxZXVjczEzNCJ9.hUn-bKdy13KBBz4UBM5vlRih4QQOeqFvDt3NxegbTQA"}`
          }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};