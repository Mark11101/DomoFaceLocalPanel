import axios from 'axios'

export default axios.create({
  withCredentials: true,
  headers: {
    Authorization: 'Basic YWRtaW46RGY3I2FkNThjZWQwODFmNzk2ZjljZjE5OWUzN2JmNmI4ZDVj'
  },
});
