import Swal from 'sweetalert2'

export const handleError = (msge) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: msge,
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