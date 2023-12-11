let username = "";
const courses = [];

var id = 0;

function createCourse() {
  const title = document.getElementById("inputTitle").value;
  const description = document.getElementById("inputDescription").value;
  const srcImg = document.getElementById("inputSrcImg").value;
  const categoriesInput = document.getElementById("inputCategories").value;
  // divisione delle categorie nell'array
  const categories = categoriesInput
    .split(",")
    .map((category) => category.trim());

  const course = {
    id: id++,
    author: username,
    title: title,
    description: description,
    srcImg: srcImg,
    categories: [],
  };
  courses.push(course);
  console.log(course);
  updateLocalStorage();
}

function editCourse({ id, title, description, srcImg, categories }) {
  const index = courses.findIndex((course) => course.id === id);
  if (index !== -1) {
    courses[index] = {
      ...courses[index],
      title,
      description,
      srcImg,
      categories,
    };
    updateLocalStorage();
  }
}

function deleteCourse(id) {
  const index = courses.findIndex((course) => course.id === id);
  if (index !== -1) {
    courses.splice(index, 1);
  }
  updateLocalStorage();
}

//filter restituisce un array che contiene la cat. specificata.
function getCoursesByCategory(category) {
  return courses.filter((course) => course.categories.includes(category));
}

//reduce itera nell'array dei courses. per ogni categoria si vede se è presente e se non è presente viene aggiunta
function getCategories() {
  const allCategories = courses.reduce((categories, course) => {
    course.categories.forEach((category) => {
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });
    return categories;
  }, []);
  return allCategories;
}

function updateLocalStorage() {
  localStorage.setItem("courses", JSON.stringify(courses));
}

function login() {
  const usernameInput = document.getElementById("inputUsername").value;
  if (usernameInput.trim() !== "") {
    //assegna il valore dell'input a username
    username = usernameInput;
    console.log(username);
    //loggando devo essere in grado di vedere il bottone addCourse!
    //Ma devo nascondere anche log in e username!
    document.getElementById("addCourseBtn").classList.remove("d-none");
    document.getElementById("log-out-btn").classList.remove("d-none");
    document.getElementById("log-in-btn").classList.add("d-none");
    document.getElementById("inputUsername").classList.add("d-none");
  }
}

function logout() {
  //sloggando devo essere in grado di vedere di nuovo login!
  //add course non visibile...
  document.getElementById("addCourseBtn").classList.add("d-none");
  document.getElementById("log-in-btn").classList.remove("d-none");
  document.getElementById("inputUsername").classList.remove("d-none");
}

document.addEventListener("DOMContentLoaded", function () {
    const storedCourses = JSON.parse(localStorage.getItem("courses"));

    if (storedCourses && storedCourses.length > 0) {
        courses.push(...storedCourses);

        courses.forEach((course) => {
        const allCourses = document.querySelector('.all-container');
        const courseCard = document.createElement('div');
        courseCard.classList.add('card');
        allCourses.appendChild(courseCard);
    
        const courseImg = document.createElement('img');
        courseImg.classList.add('card-img-top');
        courseImg.setAttribute('src', course.srcImg); 
        courseCard.appendChild(courseImg);
    
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        courseCard.appendChild(cardBody);
    
        const courseTitle = document.createElement('h5');
        courseTitle.classList.add('card-title');
        courseTitle.innerText = course.title;
        cardBody.appendChild(courseTitle);
    
        const courseDescription = document.createElement('p');
        courseDescription.classList.add('card-text');
        courseDescription.innerText = course.description;
        cardBody.appendChild(courseDescription);

        const listGroup = document.createElement('ul');
        listGroup.classList.add('list-group', 'list-group-flush');
        
        const authorSignature = document.createElement('li');
        authorSignature.classList.add('list-group-item');
        authorSignature.innerText = `author: ${course.author}`;

        const readMore = document.createElement('li');
        readMore.classList.add('list-group-item');
        readMore.innerHTML = ` <button
        type="button"
        class="btn btn-dark"
        style="height: min-content"
        data-bs-toggle="modal"
        data-bs-target="#readMoreModal"
        id="readMoreBtn"
      >
        Read info
      </button>`;
        
        listGroup.appendChild(authorSignature);
        listGroup.appendChild(readMore);
        cardBody.appendChild(listGroup);
    });
    }
  // Aggiungi corso BTN event listener
  document
    .getElementById("addCourseBtn")
    .addEventListener("click", function () {
      const modalTitle = document.querySelector("#modalTitle"); //titolo del modal
      const modalBody = document.querySelector("#modalBody"); //corpo del modal

      const userModal = document.createElement("h3");
      userModal.innerText = `${username} add a course!`;

      modalTitle.appendChild(userModal);

      const titleField = document.createElement("h5");
      titleField.innerText = `Title:`;
      modalBody.appendChild(titleField);

      const titleInput = document.createElement("input");
      titleInput.setAttribute("placeholder", "Course Title"); //placeholder dell'imput title
      titleInput.setAttribute("id", "inputTitle"); //id di title mi serve per prenderne il valore.
      titleInput.classList.add("form-control");
      modalBody.appendChild(titleInput);

      const descriptionField = document.createElement("h5");
      descriptionField.innerText = `Description:`;
      modalBody.appendChild(descriptionField);

      const descriptionInput = document.createElement("textarea");
      descriptionInput.setAttribute("placeholder", "Course Description");
      descriptionInput.setAttribute("id", "inputDescription"); 
      descriptionInput.classList.add("form-control");
      modalBody.appendChild(descriptionInput);

      // ImgSrc
      const srcImgField = document.createElement("h5");
      srcImgField.innerText = `Image URL:`;
      modalBody.appendChild(srcImgField);

      const srcImgInput = document.createElement("input");
      srcImgInput.setAttribute("placeholder", "Image URL");
      srcImgInput.setAttribute("type", "url"); // SOLO URL
      srcImgInput.setAttribute("id", "inputSrcImg");
      srcImgInput.classList.add("form-control");
      modalBody.appendChild(srcImgInput);

      // CATEGORIES
      const categoriesField = document.createElement("h5");
      categoriesField.innerText = `Categories:`;
      modalBody.appendChild(categoriesField);

      const categoriesInput = document.createElement("input");
      categoriesInput.setAttribute(
        "placeholder",
        "Separate categories with commas"
      );
      categoriesInput.setAttribute("id", "inputCategories");
      categoriesInput.classList.add("form-control");
      modalBody.appendChild(categoriesInput);
    });

  //se chiudo il modal dell'aggiunta corso, devo svuotare il body! Così se riclicco non è duplicato.
  document
    .getElementById("closeBtnforAddCourse")
    .addEventListener("click", function () {
      console.log(`eliminazione...`);
      const modalTitle = document.querySelector("#modalTitle");
      const modalBody = document.querySelector("#modalBody");

      modalTitle.innerHTML = "";
      modalBody.innerHTML = "";
    });
});
