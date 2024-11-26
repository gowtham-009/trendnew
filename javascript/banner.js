const loading = document.getElementById('loading');
const error = document.getElementById('error');
const date=new Date()
document.getElementById('currenttime').innerHTML=date

const get_data = async () => {
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
        document.getElementById('companyname').innerHTML =data[0].company_name
        document.getElementById('bse').innerHTML =data[0].bse
        document.getElementById('nse').innerHTML =data[0].nse
        document.getElementById('price').innerHTML =data[0].price
        document.getElementById('totalprice').innerHTML =data[0].today_price
        document.getElementById('today_percentage').innerHTML =data[0].today_percentage
        document.getElementById('all_percentage').innerHTML =data[0].all_time_percentage
        document.getElementById('volume').innerHTML =data[0].volume
    } catch (err) {
        error.style.display = "block";
        document.getElementById('error_message').textContent = err.message;
    } finally {
        loading.style.display = 'none';
    }
};

get_data();