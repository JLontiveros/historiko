const handleUpload = async (file) => {
    try {
      // Upload the image to Supabase Storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(`public/${file.name}`, file);
  
      if (error) throw error;
  
      // Get the public URL of the uploaded image
      const imageUrl = supabase.storage
        .from('product-images')
        .getPublicUrl(data.path).data.publicUrl;
  
      // Insert the record in the database
      const { data: record, error: dbError } = await supabase
        .from('products')
        .insert([
          { name: 'Your Product Name', image_url: imageUrl },
        ]);
  
      if (dbError) throw dbError;
  
      console.log('Record saved:', record);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  
  // Example usage in a form
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };
  
  return <input type="file" onChange={handleFileChange} />;
  