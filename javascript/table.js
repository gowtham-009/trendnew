const loading=document.getElementById('loading')
const error=document.getElementById('error')
loading.style.display='none'
error.style.display='none'

const table_get_data = async () => {
    loading.style.display = 'block';
    error.style.display = 'none';   

    
    const url = 'jsondata/data.json';
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
        }

        const data = await response.json();
        table_render_data(data[2])
    } catch (err) {
        error.style.display = "block";
        document.getElementById('error_message').textContent = err.message;
    } finally {
        loading.style.display = 'none';
    }
};

table_get_data();

const table_render_data = (all_data) => {
const promoter_all = all_data.promoter_all;
const fll_Data = all_data.fll;
const dll_Data = all_data.dll_all;
const public_data = all_data.public;
const other_data = all_data.others;
const tableBody = document.getElementById('fetch_data');
tableBody.innerHTML = '';

// Helper function to create rows dynamically
const createRow = (dataObj, isParent = false, rowId = '') => {
    const row = document.createElement('tr');
    if (isParent) row.id = rowId;

    // Determine if padding is required based on `dataObj.data_type`
    const paddingRequired = ['holding', 'pledged', 'locked', 'mutual funds', 'banks', 'insurance', 'other'].includes(dataObj.data_type.toLowerCase());

    row.innerHTML = `
        <td style="${paddingRequired ? 'padding-left: 28px;' : ''}">
            ${dataObj.data_type}${isParent ? ' <i class="fa-solid fa-caret-down"></i>' : ''}
        </td>
        <td>${dataObj.jan_2024}</td>
        <td>${dataObj.fab_2024}</td>
        <td>${dataObj.mar_2024}</td>
        <td>${dataObj.api_2024}</td>
        <td>${dataObj.may_2024}</td>
        <td>${dataObj.jun_2024}</td>
        <td>${dataObj.jul_2024}</td>
        <td>${dataObj.aug_2024}</td>
        <td>${dataObj.sep_2024}</td>
        <td>${dataObj.oct_2024}</td>
        <td>${dataObj.nov_2024}</td>
        <td>${dataObj.dec_2024}</td>
    `;
    return row;
};

// Add Promoter data
const promoterRow = createRow(promoter_all.promoter, true, 'toggleRow');
tableBody.appendChild(promoterRow);

const promoterSubRows = [
createRow(promoter_all.holding),
createRow(promoter_all.pledged),
createRow(promoter_all.locked),
];
promoterSubRows.forEach(row => {
    row.style.display = 'none'; 
    row.style.opacity = '0.5'; 
  
tableBody.appendChild(row);
});

// Add toggle functionality for promoter rows
const toggleRow = document.getElementById('toggleRow');
toggleRow.style.cursor = 'pointer';
toggleRow.addEventListener('click', () => {
const isVisible = promoterSubRows[0].style.display === 'table-row';
promoterSubRows.forEach(row => {
    row.style.display = isVisible ? 'none' : 'table-row';
});
});

// Add FLL data
const fllRow = createRow(fll_Data);
tableBody.appendChild(fllRow);

// Add DLL data
const dllRow = createRow(dll_Data.dll, true, 'dll_toggle');
tableBody.appendChild(dllRow);

const dllSubRows = [
createRow(dll_Data.mutual_funds),
createRow(dll_Data.banks),
createRow(dll_Data.insurance),
createRow(dll_Data.others),
];
dllSubRows.forEach(row => {
row.style.display = 'none';
row.style.opacity = 0.5;
tableBody.appendChild(row);
});

// Add toggle functionality for DLL rows
const dllToggleRow = document.getElementById('dll_toggle');
dllToggleRow.style.cursor = 'pointer';
dllToggleRow.addEventListener('click', () => {
const isVisible = dllSubRows[0].style.display === 'table-row';
dllSubRows.forEach(row => {
    row.style.display = isVisible ? 'none' : 'table-row';
});
});

// Add Public data
const publicRow = createRow(public_data);
tableBody.appendChild(publicRow);

// Add Other data
const otherRow = createRow(other_data);
tableBody.appendChild(otherRow);
};
