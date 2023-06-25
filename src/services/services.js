import instance from "./instance";

const getAll = async (p) => {
  const { data } = await instance.get(`/?p=${p}&limit=3`);
  return data;
};

const changeFollow = async (id, newData) => {
  const { data } = await instance.put(`/${id}`, newData);
  return data;
};

const services = {
  getAll,
  changeFollow,
};

export default services;
