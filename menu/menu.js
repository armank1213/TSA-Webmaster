'use strict'; 

/* 
Filename:   menu.js
*/

// Vegan Menu Items, Prices, Descriptions, and Images
const foodItem = [
  'Garden Flatbread',
  'Wild Mushroom Risotto',
  'Evergreen Bowl',
  'Seasonal Harvest Soup',
  'Rainbow Veggie Stir-Fry',
  'Chocolate Avocado Mousse',
  'Grilled Veggie Sandwich'
];

const foodPrice = [15.95, 12.95, 10.95, 9.95, 13.95, 9.95, 12.95];

const foodDesc = [
  'Flatbread topped with fresh vegetables, herbs, and a light sauce, featuring ingredients like tomatoes, bell peppers, zucchini, spinach, onions, and basil on a thin, crispy crust. Calories: 1000 Per Flatbread.',
  'Creamy Arborio rice infused with garlic, fresh thyme, and white wine, topped with sautéed wild mushrooms and crispy shallots. Calories: 400 Per Serving.',
  'Baby kale, arugula, heirloom carrots, watermelon radish, toasted walnuts, and orange segments tossed with a maple-mustard vinaigrette. Calories: 450 Per Bowl.',
  'Winter: Roasted Butternut Squash Soup with sage oil and toasted pumpkin seeds. Spring: Asparagus and Green Pea Soup garnished with microgreens and cashew cream. Calories: 200 Per Bowl.',
  'A medley of farm-fresh veggies (zucchini, bell peppers, snap peas, carrots) stir-fried in a tangy ginger-soy glaze, served over organic brown rice or quinoa. Calories: 500 With Rice.',
  'Rich and creamy chocolate mousse made with ripe avocados and sweetened with maple syrup, served with coconut whipped cream. Calories: 300 Per Serving.',
  'Charred zucchini, roasted bell peppers, caramelized onions, and hummus on a toasted whole-grain baguette, served with a side of fresh greens. Calories: 450 Per Sandwich.'
];

const foodImg = [
  '../resources/menu_items/garden_flatbread.jpg',
  '../resources/menu_items/risotto.jpg',
  '../resources/menu_items/evergreen-bowl.jpg',
  '../resources/menu_items/seasonal_soup.jpg',
  '../resources/menu_items/rainbow_stir-fry.jpg',
  '../resources/menu_items/avocado_mousse.jpg',
  '../resources/menu_items/grilled_sandwich.jpg'
];

window.addEventListener('load', () => {
  const menuTable = document.getElementById('menuTable');

  for (let i = 0; i < foodItem.length; i++) {
    let row = document.createElement('tr');

    let imageCell = document.createElement('td');
    let image = new Image();
    image.src = '../resources/' + foodImg[i];
    image.alt = foodItem[i];
    image.width = 150;
    image.height = 110;
    imageCell.appendChild(image);
    row.appendChild(imageCell);

    let itemName = document.createElement('td');
    itemName.textContent = foodItem[i];
    let itemDesc = document.createElement('p');
    itemDesc.textContent = foodDesc[i];
    itemDesc.classList.add('itemDesc');
    itemName.appendChild(itemDesc);
    row.appendChild(itemName);
    
    let price = document.createElement('td');
    price.textContent = '$' + foodPrice[i].toFixed(2);
    price.classList.add('price');
    row.appendChild(price);

    menuTable.appendChild(row);
  }
});


