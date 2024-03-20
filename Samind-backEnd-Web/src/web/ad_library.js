const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = require('./connection.js');
const auth = require('./auth.js').authorization;

router.use(bodyParser.json());

router.post('/adLibraryView', auth, (req, res) => {
  const { hospitalName, type } = req.body;

  // Construct the SQL query to fetch data from the library table
  let query = `
    SELECT 
      ROW_NUMBER() OVER () AS "No",
      name AS "title",
      url AS "url",
      image_url AS "imageUrl"
    FROM 
      public.library
    WHERE 
      hospital_name = $1
      AND type = $2
  `;
  
  const queryParams = [hospitalName, type];

  // Execute the query
  client.query(query, queryParams)
    .then(result => {
      const rows = result.rows.map(row => ({
        "No": row.No.toString().padStart(2, '0'), // Auto generate "No" starting with "01"
        "title": row.title, // Use data from the "name" column
        "url": row.url, // Use data from the "url" column
        "imageUrl": row.imageUrl // Use data from the "image_url" column
      }));
      res.json(rows);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Carousel
// router.post('/adCarouselView', (req, res) => {
//   const { patientID } = req.body;
//   const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//   let query = 'SELECT * FROM therapist';

//   // Check if the id parameter is provided
//   if (therapist_id) {
//     query += ' WHERE therapist_id = $1';
//   }

//   const queryParams = therapist_id ? [therapist_id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });


// router.post('/adCarouselEdit', (req, res) => {
//     const { patientID } = req.body;
//     const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID
  
//     let query = 'SELECT * FROM therapist';
  
//     // Check if the id parameter is provided
//     if (therapist_id) {
//       query += ' WHERE therapist_id = $1';
//     }
  
//     const queryParams = therapist_id ? [therapist_id] : [];
  
//     client.query(query, queryParams)
//       .then(result => {
//         res.json(result.rows);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'An error occurred' });
//       });
//   });

// router.post('/adCarouselEdit', (req, res) => {
//   const { hospitalName, title, url, imageUrl, type } = req.body;

//   // Update the title, url, and imageUrl where name matches the title
//   const updateQuery = `
//     UPDATE public.library
//     SET name = $1, url = $2, image_url = $3, type = $4
//     WHERE name = $5
//   `;

//   const updateParams = [title, url, imageUrl, type, title];

//   client.query(updateQuery, updateParams)
//     .then(result => {
//       if (result.rowCount > 0) {
//         // Data updated successfully
//         res.json({ message: 'Data updated successfully' });
//       } else {
//         // No matching record found for the given title
//         res.status(404).json({ error: 'No matching record found for the given title' });
//       }
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred while updating data' });
//     });
// });

// router.post('/adLibraryEdit', (req, res) => {
//   const { hospitalName, title, url, imageUrl, type } = req.body;

//   // Update the title, url, and imageUrl where name matches the title
//   const updateQuery = `
//     UPDATE public.library
//     SET name = $1, url = $2, image_url = $3, type = $4
//     WHERE name = $5 AND hospital_name = $6 AND type = $7
//   `;

//   const updateParams = [title, url, imageUrl, type, title, hospitalName, type];

//   client.query(updateQuery, updateParams)
//     .then(result => {
//       if (result.rowCount > 0) {
//         // Data updated successfully
//         res.json({ message: 'Data updated successfully' });
//       } else {
//         // No matching record found for the given title, hospitalName, and type
//         res.status(404).json({ error: 'No matching record found for the given parameters' });
//       }
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred while updating data' });
//     });
// });

// router.post('/adLibraryEdit', (req, res) => {
//   const { hospitalName, title, titleNew, url, imageUrl, type } = req.body;

//   // Update the title, url, and imageUrl where name matches the title
//   const updateQuery = `
//     UPDATE public.library
//     SET name = $1, url = $2, image_url = $3, type = $4
//     WHERE name = $5 AND hospital_name = $6 AND type = $7
//   `;

//   const updateParams = [titleNew, url, imageUrl, type, title, hospitalName, type];

//   client.query(updateQuery, updateParams)
//     .then(result => {
//       if (result.rowCount > 0) {
//         // Data updated successfully
//         res.json({ message: 'Data updated successfully' });
//       } else {
//         // No matching record found for the given title, hospitalName, and type
//         res.status(404).json({ error: 'No matching record found for the given parameters' });
//       }
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred while updating data' });
//     });
// });

router.post('/adLibraryEdit', auth, (req, res) => {
  const { hospitalName, title, titleNew, url, imageUrl, type } = req.body;

  // Determine the name to use based on whether titleNew is provided
  const nameToUpdate = titleNew || title;

  // Update the title, url, and imageUrl where name matches the title
  const updateQuery = `
    UPDATE public.library
    SET name = $1, url = $2, image_url = $3, type = $4
    WHERE name = $5 AND hospital_name = $6 AND type = $7
  `;

  const updateParams = [nameToUpdate, url, imageUrl, type, title, hospitalName, type];

  client.query(updateQuery, updateParams)
    .then(result => {
      if (result.rowCount > 0) {
        // Data updated successfully
        res.json({ message: 'Data updated successfully' });
      } else {
        // No matching record found for the given title, hospitalName, and type
        res.status(404).json({ error: 'No matching record found for the given parameters' });
      }
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred while updating data' });
    });
});


// router.post('/adLibraryDelete', (req, res) => {
//   const { patientID } = req.body;
//   const numericPatientID = patientID.replace(/\D/g, ''); // Extract numeric part of patientID

//   let query = 'SELECT * FROM therapist';

//   // Check if the id parameter is provided
//   if (therapist_id) {
//     query += ' WHERE therapist_id = $1';
//   }

//   const queryParams = therapist_id ? [therapist_id] : [];

//   client.query(query, queryParams)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/adLibraryDelete', (req, res) => {
//   const { title } = req.body;

//   if (!title) {
//     return res.status(400).json({ error: 'Title is required' });
//   }

//   const query = 'DELETE FROM public.library WHERE name = $1';
//   const queryParams = [title];

//   client.query(query, queryParams)
//     .then(result => {
//       if (result.rowCount > 0) {
//         res.json({ message: 'Data deleted successfully' });
//       } else {
//         res.status(404).json({ error: 'Data not found' });
//       }
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/adLibraryDelete', (req, res) => {
//   const { hospitalName, type } = req.body;

//   if (!hospitalName || !type) {
//     return res.status(400).json({ error: 'Hospital name and type are required' });
//   }

//   const query = 'DELETE FROM public.library WHERE hospital_name = $1 AND type = $2';
//   const queryParams = [hospitalName, type];

//   client.query(query, queryParams)
//     .then(result => {
//       if (result.rowCount > 0) {
//         res.json({ message: 'Data deleted successfully' });
//       } else {
//         res.status(404).json({ error: 'Data not found' });
//       }
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/adLibraryDelete', auth, (req, res) => {
  const { hospitalName, type, title } = req.body;

  if (!hospitalName || !type || !title) {
    return res.status(400).json({ error: 'Hospital name, type, and title are required' });
  }

  const query = 'DELETE FROM public.library WHERE hospital_name = $1 AND type = $2 AND name = $3';
  const queryParams = [hospitalName, type, title];

  client.query(query, queryParams)
    .then(result => {
      if (result.rowCount > 0) {
        res.json({ message: 'Data deleted successfully' });
      } else {
        res.status(404).json({ error: 'Data not found' });
      }
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// router.post('/adLibraryCreate', (req, res) => {
//   const { hospitalName, title, url, imageUrl, type } = req.body;

//   if (!hospitalName || !title || !url || !imageUrl || !type) {
//     return res.status(400).json({ error: 'Hospital name, title, url, imageUrl, and type are required' });
//   }

//   const insertQuery = 'INSERT INTO public.library (library_id, name, url, hospital_name, type, image_url) VALUES (NEXTVAL(\'library_id_seq\'), $1, $2, $3, $4, $5)';
//   const insertParams = [title, url, hospitalName, type, imageUrl];

//   client.query(insertQuery, insertParams)
//     .then(result => {
//       res.json({ message: 'Data inserted successfully' });
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// router.post('/adLibraryCreate', (req, res) => {
//   const { hospitalName, title, url, imageUrl, type } = req.body;

//   if (!hospitalName || !title || !type) {
//     return res.status(400).json({ error: 'Hospital name, title, and type are required' });
//   }

//   let insertQuery, insertParams;

//   if (url) {
//     insertQuery = 'INSERT INTO public.library (library_id, name, url, hospital_name, type, image_url) VALUES (NEXTVAL(\'library_id_seq\'), $1, $2, $3, $4, $5)';
//     insertParams = [title, url, hospitalName, type, imageUrl];
//   } else {
//     insertQuery = 'INSERT INTO public.library (library_id, name, url, hospital_name, type, image_url) VALUES (NEXTVAL(\'library_id_seq\'), $1, NULL, $2, $3, NULL)';
//     insertParams = [title, hospitalName, type, imageUrl];
//   }

//   client.query(insertQuery, insertParams)
//     .then(result => {
//       res.json({ message: 'Data inserted successfully' });
//     })
//     .catch(err => {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

router.post('/adLibraryCreate', auth, (req, res) => {
  const { hospitalName, title, url, imageUrl, type } = req.body;

  if (!hospitalName || !title || !type) {
    return res.status(400).json({ error: 'Hospital name, title, and type are required' });
  }

  let insertQuery, insertParams;

  if (url && imageUrl) {
    insertQuery = 'INSERT INTO public.library (library_id, name, url, hospital_name, type, image_url) VALUES (NEXTVAL(\'library_id_seq\'), $1, $2, $3, $4, $5)';
    insertParams = [title, url, hospitalName, type, imageUrl];
  } else if (url) {
    insertQuery = 'INSERT INTO public.library (library_id, name, url, hospital_name, type, image_url) VALUES (NEXTVAL(\'library_id_seq\'), $1, $2, $3, $4, NULL)';
    insertParams = [title, url, hospitalName, type];
  } else if (imageUrl) {
    insertQuery = 'INSERT INTO public.library (library_id, name, url, hospital_name, type, image_url) VALUES (NEXTVAL(\'library_id_seq\'), $1, NULL, $2, $3, $4)';
    insertParams = [title, hospitalName, type, imageUrl];
  } else {
    insertQuery = 'INSERT INTO public.library (library_id, name, url, hospital_name, type, image_url) VALUES (NEXTVAL(\'library_id_seq\'), $1, NULL, $2, $3, NULL)';
    insertParams = [title, hospitalName, type];
  }

  client.query(insertQuery, insertParams)
    .then(result => {
      res.json({ message: 'Data inserted successfully' });
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});


// Link
router.post('/adLinkView', auth, (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const query = 'DELETE FROM public.library WHERE name = $1';
  const queryParams = [title];

  client.query(query, queryParams)
    .then(result => {
      if (result.rowCount > 0) {
        res.json({ message: 'Data deleted successfully' });
      } else {
        res.status(404).json({ error: 'Data not found' });
      }
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});





module.exports = router;