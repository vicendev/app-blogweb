import Swal from 'sweetalert2'

export const handleSavedSwal = (title) => {
  Swal.fire('Grabado!', title, 'success');

}

export const handleInfoSwal = (title, body) => {

  Swal.fire({
    icon:'info',
    title: '¡Información!',
    html: `
      <h6 class="title is-size-6">${title}</h6>
      <div class="notification is-info">${body}</div>
    `
  })
}

export const handleDeleteSwal = async (itemTitle, tipo) => {

  let resp;

  await Swal.fire({
    icon:'question',
    title: 'Eliminar',
    html: `
      <h6 class="title is-size-6">¿Desea eliminar el siguiente ${tipo}?</h6>
      <div class="notification is-warning is-light">${itemTitle}</p>
    `,
    showCancelButton: true,
    confirmButtonText: `Eliminar`,
  }).then((result) => {
    if (result.isConfirmed) {
      resp =  true;
    } else {
      resp =  false;
    }
  })

  return resp;
}

export const handleUploadingSwal = (isUploading) => {

  if (isUploading){
    Swal.fire({
      title: 'Actualizando...',
      text: 'Por favor espere...',
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
  } else {
    Swal.close();
  }

}