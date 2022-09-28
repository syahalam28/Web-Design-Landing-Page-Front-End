let setting = {
  name: "OCTO-DO",
  icon: "fa fa-bell",
};
document.querySelector("#icon").setAttribute("class", setting.icon);
document.querySelector("#name_set").innerHTML = setting.name;
let elements = [];
window.onload = function () {
  if (JSON.parse(localStorage.getItem("cimb-niaga-do-list")) !== null) {
    elements = JSON.parse(localStorage.getItem("cimb-niaga-do-list"));
    console.log(elements);
    display();
  }
};
function addElement() {
  let getText = document.querySelector(".addText").value.trim() !== "";
  if (getText) {
    elements.push(document.querySelector(".addText").value.trim());
    // Clear Input After Push
    document.querySelector(".addText").value = "";
    // Tenary Operation LocalStorage SetItem
    localStorage.getItem("cimb-niaga-do-list") === null
      ? localStorage.setItem("cimb-niaga-do-list", JSON.stringify(elements))
      : localStorage.setItem("cimb-niaga-do-list", JSON.stringify(elements));
    console.log(localStorage.getItem("cimb-niaga-do-list"));
    display();
  } else {
    Swal.fire({
      title: "<strong>To do list cannot be empty</strong>",
      icon: "info",
      html: "You can write your daily list here",
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: "Thumbs up, great!",
    });
  }
}

function display() {
  document.querySelector(".list").innerHTML = "";
  elements.forEach((element, index) => {
    document.querySelector(".list").innerHTML +=
      `
    <ul
    class="list-group list-group-horizontal rounded-0 bg-transparent"
  >
  
    <li
      class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent"
    >
    <a style='margin-right:10px'
    onclick='garis(` +
      index +
      `)'
      href="#!"
      class="text-info"
      data-mdb-toggle="tooltip"
      title="Done todo"
      ><i class="fa fa-check-square"></i
     ></a>
      <p class="lead fw-normal mb-0">
        ` +
      element +
      `
      </p>
     
      <a style='margin-left: 10px'
      onclick='hapus(` +
      index +
      `)'
        href="#!"
        class="text-danger"
        data-mdb-toggle="tooltip"
        title="Hapus todo"
        ><i class="fa fa-trash"></i
       ></a>

    </li>
    
  

  </ul>
    
    `;
  });
}

function hapus(i) {
  Swal.fire({
    title: "Apakah Anda Yakin?",
    text: "Data Yang Anda Pilih Akan Dihapus",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Hapus Data!",
  }).then((result) => {
    if (result.isConfirmed) {
      elements.splice(i, 1);
      // Tenary Operation Local Storage
      localStorage.getItem("cimb-niaga-do-list") === null
        ? localStorage.setItem("cimb-niaga-do-list", JSON.stringify(elements))
        : localStorage.setItem("cimb-niaga-do-list", JSON.stringify(elements));
      console.log(elements);
      window.location.reload();
      display();
    }
  });
}

function garis(i) {
  if (elements[i].includes("<s>")) {
    elements[i] = elements[i].replace("<s>", "");
    elements[i] = elements[i].replace("</s>", "");
  } else {
    elements[i] = "<s>" + elements[i] + "</s>";
    if (localStorage.getItem("cimb-niaga-do-list") === null) {
      localStorage.setItem("cimb-niaga-do-list", JSON.stringify(elements));
    } else {
      localStorage.setItem("cimb-niaga-do-list", JSON.stringify(elements));
    }
  }
  display();
}

// Filtter Function & Tenary Operation Local Storage Check
// Menampilkan List Todo yang sudah selesai
let cek = JSON.parse(localStorage.getItem("cimb-niaga-do-list")) !== null;

function filter() {
  let local = JSON.parse(localStorage.getItem("cimb-niaga-do-list")).filter(
    (element) => element.includes("<s>")
  );

  local.forEach((element, index) => {
    document.querySelector(".modal-body").innerHTML +=
      `
    <ul class="list-group">
    <li class="list-group-item">` +
      (index + 1) +
      ` . ` +
      element +
      `</li>
  </ul>
  
    `;
  });
}
cek
  ? filter()
  : (document.querySelector(
      "#null"
    ).innerHTML = `<div class="alert alert-info" role="alert">
      Local Storage Is Not Set
    </div>`);

// let input = prompt("Masukan id");
// var sea = JSON.parse(localStorage.getItem("cimb-niaga-do-list")).filter(
//   (element) => element == input
// );
// document.querySelector("#test").innerHTML = sea;
// console.log(sea);
