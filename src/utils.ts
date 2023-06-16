
const apiRequest = async (url: string, body: any, emit: any) =>{    
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...body['options']})
      })
      const data = await response.json();
      return data;
  
    } catch (error) {
      emit('verify', {chain: 'server intent', error: true, data: error })
    }
  }


  export {
    apiRequest
  }

  




  