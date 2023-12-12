## Online Course Marketplace Application

### Description

**Objective:** Develop a marketplace application for managing online courses.



#### Requirements:

1. **Authentication Page:**
   - Implement a simple login field.
   - Users should enter a username to access the platform.
   - No actual authentication is required; static username verification is sufficient.

2. **Course Display:**
   - Display a list of courses.
   - Each course should include: id, image, title, description, categories, author.
   - Display the first 4 courses for each category.

3. **Upload New Course:**
   - Only authenticated users can upload new courses.
   - Provide a form for entering course details (title, description, image, categories).

4. **Course Details and Edit:**
   - Clicking on a course should open a modal with its details.
   - If the user is authenticated, allow course editing within the same modal.
   - Implement a toggle to switch between viewing and editing.

5. **Delete Course:**
   - Add the option to delete a course (only for authenticated users).

#### Data Structure:

- `username`: string
- `courses`: Array of objects with { id, srcImg, title, description, categories, author where author corresponds to the logged-in username }

#### JavaScript Functions:

- `createCourse({ title, description, srcImage, categories })`: Add a new course.
- `editCourse({ id, title, description, author, srcImage, categories })`: Modify an existing course.
- `deleteCourse(id)`: Delete a course.
- `detailCourse(id)`: View course details.
- `getCoursesByCategory(category)`: Filter courses by category.
- `getCategories()`: Get the list of available categories.

#### CSS:

- Styling should adhere to the basic design outlined in the provided mockup.
- Implement responsive design.

#### Additional Notes:

- Adapt the data structure or functions as needed for specific project requirements.

This exercise allows exploration of various aspects of web development, including authentication handling, data manipulation, user interface interactivity, and responsive design.
