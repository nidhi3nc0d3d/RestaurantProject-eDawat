import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Menu',
    path: '/Menu',
    icon: <AiIcons.AiOutlineMenuUnfold/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Display Menu',
        path: '/Menu/Display',
        icon: <IoIcons.IoMdRestaurant/>
      },
      {
        title: 'Add a New Menu',
        path: '/Menu/Add',
        icon: <IoIcons.IoIosRestaurant />
      }
    ]
  },
  {
    title: 'Category',
    path: '/Category',
    icon: <IoIcons.IoMdCube/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Display All Items',
        path: '/Category/AllCategory',
        icon: <IoIcons.IoLogoXbox />,
        cName: 'sub-nav'
      },
      {
        title: 'Add a new Category',
        path: '/Category/AddCategory',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Delete Category',
        path: '/Category/Delete',
        icon: <AiIcons.AiTwotoneDelete />
      }
    ]
  },
  {
    title: 'Dish',
    path: '/Dish',
    icon: <FaIcons.FaSearchMinus/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
        {
          title: 'Display Dishes',
          path: '/Dish/AllDishes',
          icon: <IoIcons.IoMdRestaurant/>,
          cName: 'sub-nav'
        },
        {
          title: 'Add a new Dish',
          path: '/Dish/NewDish',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        },
        {
            title: 'Update Dish',
            path: '/Dish/Update',
            icon: <IoIcons.IoIosPricetag />,
            cName: 'sub-nav'
        },
        {
          title: 'Delete Dish',
          path: '/Dish/Delete',
          icon: <AiIcons.AiTwotoneDelete />
        }
      ]
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];