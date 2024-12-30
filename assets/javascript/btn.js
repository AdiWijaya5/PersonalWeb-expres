function archiveFunction() {
  event.preventDefault();
  var form = event.target.form;
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        title: 'Deleted!',
        text: 'Your Project has been deleted.',
        position: 'center',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        form.submit();
      }, 1500);
    }
  });
}

// button save edit

function buttonsave() {
  event.preventDefault();
  var form = event.target.form;
  Swal.fire({
    title: 'Are you sure?',
    text: 'You Save Edit MyProject ',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Save',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your file has seve.',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        form.submit();
      }, 1500);
    }
  });
}

function buttonsaveadd() {
  event.preventDefault();
  var form = event.target.form;
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    form.submit();
  }, 1500);
}
