import React from 'react';
import './category.css';

function CategoriesPage({ clickHandle }) {
  const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];

  return (
    <div className='cat'>
      <h1 className='catHead'>Select a Category</h1>
      <ul className='list'>
        {categories.map((category, index) => {
          let className;
          if (index === 0) {
            className = 'category_list_first_item lss'; // Class for the first item
          } else if (index === categories.length - 1) {
            className = 'category_list_last_item lss'; // Class for the last item
          } else {
            className = 'category_list_each_item lss'; // Class for all other items
          }

          return (
            <li
              className={className}
              key={index}
              onClick={() => clickHandle(category)}
              style={{ cursor: 'pointer' }}
            >
              {category}
              <p>&gt;</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CategoriesPage;
