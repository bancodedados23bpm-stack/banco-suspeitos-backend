require('dns').lookup('db.fkyemiplmftuzadybwtn.supabase.co', (err, address, family) => {
  if (err) {
    console.error('DNS ERROR:', err);
  } else {
    console.log('DNS OK:', address, family);
  }
});
