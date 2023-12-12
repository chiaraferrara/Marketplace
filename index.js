/** @format */

let username = '';
const courses = [];
var id = 0;
function createCourse() {
  const title = document.getElementById('inputTitle').value;
  const description = document.getElementById('inputDescription').value;
  const srcImg = document.getElementById('inputSrcImg').value;
  const categoriesInput = document.getElementById('inputCategories').value;
  // divisione delle categorie nell'array
  const categories = categoriesInput.split(',').map(category => category.trim());

  //questo mi consente di trovare l'ultimo id nell'array e incrememntarlo di 1.

  const lastCourse = courses[courses.length - 1];
  const lastId = lastCourse ? lastCourse.id : 0;

  const course = {
    id: lastId + 1,
    author: username,
    title: title,
    description: description,
    srcImg: srcImg,
    categories: categories,
  };
  courses.push(course);
  console.log(course);
  updateLocalStorage();
}

function editCourse({ id, title, description, srcImg, categories }) {
  const index = courses.findIndex(course => course.id === id);
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
  const index = courses.findIndex(course => course.id === id);
  if (index !== -1) {
    courses.splice(index, 1);
  }
  updateLocalStorage();
}

//filter restituisce un array che contiene la cat. specificata.
function getCoursesByCategory(category) {
  return courses.filter(course => course.categories.includes(category));
}

//reduce itera nell'array dei courses. per ogni categoria si vede se è presente e se non è presente viene aggiunta
function getCategories() {
  const allCategories = courses.reduce((categories, course) => {
    course.categories.forEach(category => {
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });
    return categories;
  }, []);
  return allCategories;
}

function updateLocalStorage() {
  localStorage.setItem('courses', JSON.stringify(courses));
}

function login() {
  const usernameInput = document.getElementById('inputUsername').value;
  if (usernameInput.trim() !== '') {
    //assegna il valore dell'input a username
    username = usernameInput;
    console.log(username);
    //loggando devo essere in grado di vedere il bottone addCourse!
    //Ma devo nascondere anche log in e username!
    document.getElementById('addCourseBtn').classList.remove('d-none');
    document.getElementById('log-out-btn').classList.remove('d-none');
    document.getElementById('log-in-btn').classList.add('d-none');
    document.getElementById('inputUsername').classList.add('d-none');
  }
}

function logout() {
  //sloggando devo essere in grado di vedere di nuovo login!
  //add course non visibile...
  document.getElementById('addCourseBtn').classList.add('d-none');
  document.getElementById('log-out-btn').classList.add('d-none');
  document.getElementById('log-in-btn').classList.remove('d-none');
  document.getElementById('inputUsername').classList.remove('d-none');
}

function showCoursesByCategory(category) {
  const coursesToShow = getCoursesByCategory(category);
  const categoryContainer = document.getElementById('category-container');

  categoryContainer.innerHTML = '';

  for (let i = 0; i < Math.min(4, coursesToShow.length); i++) {
    const course = coursesToShow[i];

    const courseCard = document.createElement('div');
    courseCard.classList.add('card');
    categoryContainer.appendChild(courseCard);

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
    const firstSentence = course.description.split('. ')[0];
    courseDescription.innerText = firstSentence + `...`;
    cardBody.appendChild(courseDescription);

    const listGroup = document.createElement('ul');
    listGroup.classList.add('list-group', 'list-group-flush');

    const authorSignature = document.createElement('li');
    authorSignature.classList.add('list-group-item');
    authorSignature.innerText = `author: ${course.author}`;

    const readMore = document.createElement('li');
    readMore.classList.add('list-group-item');

    const readMoreBtn = document.createElement('button');
    readMoreBtn.innerText = 'Read info';
    readMoreBtn.classList.add('btn', 'btn-dark');
    readMoreBtn.style.height = 'min-content';
    readMoreBtn.setAttribute('type', 'button');
    readMoreBtn.setAttribute('data-bs-toggle', 'modal');
    readMoreBtn.setAttribute('data-bs-target', '#readMoreModal');
    readMoreBtn.setAttribute('id', `readMoreBtn-${i}`);
    listGroup.appendChild(authorSignature);
    listGroup.appendChild(readMore);
    cardBody.appendChild(readMoreBtn);
    cardBody.appendChild(listGroup);

    categoryContainer.appendChild(courseCard);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // courses.forEach((course => {
  //   const id = course.id;
  //   const title = course.title;
  //   const description = course.description;
  // }))

  const storedCourses = JSON.parse(localStorage.getItem('courses'));
  if (storedCourses.length > 0) {
    document.getElementById('categoryall').classList.remove('d-none');
  }
  if (storedCourses && storedCourses.length > 0) {
    courses.push(...storedCourses);

    storedCourses.forEach((course, index) => {
      const id = course.id;
      const author = course.author;
      const title = course.title;
      const description = course.description;
      const srcImg = course.srcImg;

      console.log(storedCourses);
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

      //facendo lo split posso visualizzare solo la prima frase
      const firstSentence = description.split('. ')[0];
      courseDescription.innerText = firstSentence + `...`;
      cardBody.appendChild(courseDescription);

      const listGroup = document.createElement('ul');
      listGroup.classList.add('list-group', 'list-group-flush');

      const authorSignature = document.createElement('li');
      authorSignature.classList.add('list-group-item');
      authorSignature.innerText = `author: ${course.author}`;

      const readMore = document.createElement('li');
      readMore.classList.add('list-group-item');

      const readMoreBtn = document.createElement('button');
      //  BUTTON READ MORE
      readMoreBtn.innerText = 'Read info';
      readMoreBtn.classList.add('btn', 'btn-dark');
      readMoreBtn.style.height = 'min-content';
      readMoreBtn.setAttribute('type', 'button');
      readMoreBtn.setAttribute('data-bs-toggle', 'modal');
      readMoreBtn.setAttribute('data-bs-target', '#readMoreModal');
      readMoreBtn.setAttribute('id', `readMoreBtn-${index}`);
      listGroup.appendChild(authorSignature);
      listGroup.appendChild(readMore);
      cardBody.appendChild(readMoreBtn);
      cardBody.appendChild(listGroup);
      (function (currentId) {
        document.getElementById(`readMoreBtn-${index}`).addEventListener('click', function () {
          const course = courses.find(course => course.id === id);
          console.log(course);
          // Creazione dei nuovi elementi per il modal
          const modalDialog = document.createElement('div');
          modalDialog.classList.add('modal-dialog');

          const modalContent = document.createElement('div');
          modalContent.classList.add('modal-content');

          const modalHeader = document.createElement('div');
          modalHeader.classList.add('modal-header');

          const modalTitle = document.createElement('input');
          // modalTitle.classList.add('form-control', 'fs-5');
          modalTitle.setAttribute('id', 'modalCourseTitle');
          modalTitle.setAttribute('value', `${course.title}`);
          modalTitle.setAttribute('disabled', true); //INPUT PER IL TITOLO
          modalTitle.innerText = course.title;

          const closeButton = document.createElement('button');
          closeButton.setAttribute('type', 'button');
          closeButton.classList.add('btn-close');
          closeButton.setAttribute('data-bs-dismiss', 'modal');
          closeButton.setAttribute('aria-label', 'Close');
          closeButton.setAttribute('id', 'closeBtnforReadMore');

          const modalBody = document.createElement('div');
          modalBody.classList.add('modal-body');
          modalBody.setAttribute('id', 'courseModalBody');

          const modalFooter = document.createElement('div');
          modalFooter.classList.add('modal-footer');

          // Aggiunta degli elementi creati al modal
          modalBody.appendChild(modalTitle);

          modalContent.appendChild(modalHeader);
          modalContent.appendChild(modalBody);
          modalContent.appendChild(modalFooter);

          modalDialog.appendChild(modalContent);

          // Aggiunta del modal al documento
          const readMoreModal = document.getElementById('readMoreModal');
          readMoreModal.innerHTML = '';
          readMoreModal.appendChild(modalDialog);

          // Aggiunta del contenuto al corpo del modal
          const courseModalDescription = document.createElement('textarea');
          courseModalDescription.innerText = course.description;
          // courseModalDescription.classList.add('form-control');
          courseModalDescription.setAttribute('disabled', true); //TEXTAREA PER LA DESCRIZIONE
          // courseModalDescription.setAttribute('value', `${course.description}`)
          modalBody.appendChild(courseModalDescription);

          const courseModalAuthor = document.createElement('span');
          courseModalAuthor.classList.add('badge', 'text-bg-dark');
          courseModalAuthor.innerHTML = course.author;
          modalBody.appendChild(courseModalAuthor);

          const courseModalTagsLabel = document.createElement('h5');
          courseModalTagsLabel.innerText = 'Tags:';
          modalBody.appendChild(courseModalTagsLabel);

          course.categories.forEach(category => {
            const courseModalTag = document.createElement('span');
            courseModalTag.classList.add('badge', 'text-bg-dark');
            courseModalTag.innerHTML = category;
            modalBody.appendChild(courseModalTag);
          });

          //MODIFICA DEL CORSO SE AUTORE == USERNAME
          var visible = false;
          if (username == course.author) {
            const editButton = document.createElement('button');
            editButton.innerHTML = `<img src="assets/edit.svg" alt="Edit" style="width: 20px; height: 20px;">`;
            editButton.classList.add('editbutton');
            editButton.setAttribute('id', 'editCourse');
            modalHeader.appendChild(editButton);
            editButton.addEventListener('click', function () {
              visible = !visible;
              modalTitle.disabled = !modalTitle.disabled;
              courseModalDescription.disabled = !courseModalDescription.disabled;
              if (visible == true) {
                const saveEditsButton = document.createElement('button');

                const saveImage = document.createElement('img');
                saveImage.src = 'assets/save.svg';
                saveImage.alt = 'Save';

                saveEditsButton.appendChild(saveImage);
                saveEditsButton.classList.add('saveEditsButton');

                saveEditsButton.addEventListener('click', function () {
                  //EDIT BUTTON
                  editCourse({
                    id: course.id,
                    title: modalTitle.value, 
                    description: courseModalDescription.value, 
                    srcImg: course.srcImg,
                    categories: course.categories,
                  });
                  modalTitle.disabled = !modalTitle.disabled;
                  courseModalDescription.disabled = !courseModalDescription.disabled;
                });

                console.log(visible);
                modalFooter.appendChild(saveEditsButton);
              }else{
                modalFooter.innerHTML='';
              }
            });
          }

          if (username == course.author) {
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = `<img src="assets/delete.svg" alt="Delete" style="width: 20px; height: 20px;">`;
            deleteButton.classList.add('editbutton');
            deleteButton.setAttribute('id', 'deleteCourse');

            deleteButton.addEventListener('click', function () {
              deleteCourse(course.id);
              console.log('Deleted!!!');
            });

            modalHeader.appendChild(deleteButton);
          }
          if (visible == true) {
            modalHeader.appendChild(closeButton);
          }
          const closeBtnforReadMore = document.getElementById('closeBtnforReadMore');
          if (closeBtnforReadMore) {
            closeBtnforReadMore.addEventListener('click', function () {
              const courseModalTitle = document.querySelector('#modalCourseTitle');
              const courseModalBody = document.querySelector('#courseModalBody');

              courseModalBody.innerHTML = '';
              courseModalTitle.innerHTML = '';
            });
          }
        });
      })(id);
    });
  }

  const categoryButtonsContainer = document.getElementById('categoryButtons');
  const uniqueCategories = getCategories();

  uniqueCategories.forEach(category => {
    const categoryButton = document.createElement('button');
    categoryButton.innerText = category;
    categoryButton.classList.add('btn', 'btn-outline-light', 'me-2');

    categoryButton.addEventListener('click', function () {
      // metodo che mostrerà solo i corsi della categoria.
      showCoursesByCategory(category);
    });

    categoryButtonsContainer.appendChild(categoryButton);
  });
});

// Aggiungi corso BTN event listener
document.getElementById('addCourseBtn').addEventListener('click', function () {
  const modalTitle = document.querySelector('#modalTitle'); //titolo del modal
  const modalBody = document.querySelector('#modalBody'); //corpo del modal

  const userModal = document.createElement('h3');
  userModal.innerText = `${username} add a course!`;

  modalTitle.appendChild(userModal);

  const titleField = document.createElement('h5');
  titleField.innerText = `Title:`;
  modalBody.appendChild(titleField);

  const titleInput = document.createElement('input');
  titleInput.setAttribute('placeholder', 'Course Title'); //placeholder dell'imput title
  titleInput.setAttribute('id', 'inputTitle'); //id di title mi serve per prenderne il valore.
  titleInput.classList.add('form-control');
  modalBody.appendChild(titleInput);

  const descriptionField = document.createElement('h5');
  descriptionField.innerText = `Description:`;
  modalBody.appendChild(descriptionField);

  const descriptionInput = document.createElement('textarea');
  descriptionInput.setAttribute('placeholder', 'Course Description');
  descriptionInput.setAttribute('id', 'inputDescription');
  descriptionInput.classList.add('form-control');
  modalBody.appendChild(descriptionInput);

  // ImgSrc
  const srcImgField = document.createElement('h5');
  srcImgField.innerText = `Image URL:`;
  modalBody.appendChild(srcImgField);

  const srcImgInput = document.createElement('input');
  srcImgInput.setAttribute('placeholder', 'Image URL');
  srcImgInput.setAttribute('type', 'url'); // SOLO URL
  srcImgInput.setAttribute('id', 'inputSrcImg');
  srcImgInput.classList.add('form-control');
  modalBody.appendChild(srcImgInput);

  // CATEGORIES
  const categoriesField = document.createElement('h5');
  categoriesField.innerText = `Categories:`;
  modalBody.appendChild(categoriesField);

  const categoriesInput = document.createElement('input');
  categoriesInput.setAttribute('placeholder', 'Separate categories with commas');
  categoriesInput.setAttribute('id', 'inputCategories');
  categoriesInput.classList.add('form-control');
  modalBody.appendChild(categoriesInput);
  closeBtnforReadMore.click();
});

//se chiudo il modal dell'aggiunta corso, devo svuotare il body! Così se riclicco non è duplicato.
document.getElementById('closeBtnforAddCourse').addEventListener('click', function () {
  console.log(`eliminazione...`);
  const modalTitle = document.querySelector('#modalTitle');
  const modalBody = document.querySelector('#modalBody');

  modalTitle.innerHTML = '';
  modalBody.innerHTML = '';
});
