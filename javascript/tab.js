const loading = document.getElementById('loading');
const error = document.getElementById('error');

const table_data = async () => {
  loading.style.display = 'block';
  const api = 'jsondata/data.json';

  try {
    const response = await fetch(api, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status);
    } else {
      const data = await response.json();
      console.log("previous:", data)
      const filteredData = data.filter(item => !item.company_name);
    
      rendertable(filteredData);
    }
  } catch (error) {
    error.style.display = 'block';
    document.getElementById('error_message').textContent = error.message;
  } finally {
    loading.style.display = 'none';
  }
};

const tableBody = document.getElementById('data_table');

const rendertable = (data) => {
  tableBody.innerHTML = '';
  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.summary}</td>
      <td>${item.jan_2024}</td>
      <td>${item.fab_2024}</td>
      <td>${item.mar_2024}</td>
      <td>${item.api_2024}</td>
      <td>${item.may_2024}</td>
      <td>${item.jun_2024}</td>
      <td>${item.jul_2024}</td>
      <td>${item.aug_2024}</td>
      <td>${item.sep_2024}</td>
      <td>${item.oct_2024}</td>
      <td>${item.nov_2024}</td>
      <td>${item.dec_2024}</td>
    `;
    tableBody.appendChild(row);
  });
};

table_data();