-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2023 at 12:22 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grootan`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `hash` text NOT NULL,
  `owner_mail` text NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `rating` float NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `rating`, `image`) VALUES
(1, 'Laptop', 'Laptop Description', 59999, 4.5, 'images/products/laptop.jpg'),
(2, 'Phone', 'Phone Description', 30000, 4.2, 'images/products/phone.jpg'),
(3, 'Speaker', 'Speaker Description', 6999, 4, 'images/products/speaker.jpg'),
(4, 'Television', 'Television Description', 89999, 4.7, 'images/products/tv.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `username` text NOT NULL,
  `mail` text NOT NULL,
  `isadmin` int(11) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `username`, `mail`, `isadmin`, `password`) VALUES
(1, '', 'manoj', 0, '12345'),
(2, '', 'x', 0, 'x'),
(3, '', 'manoj', 0, 'undefined'),
(4, '', 'manoj', 0, 'undefined'),
(5, '', 'manoj', 0, 'undefined'),
(6, '', 'manoj', 0, 'undefined'),
(7, '', 'manoj', 0, 'undefined'),
(8, '', 'manoj', 0, 'undefined'),
(9, '', 'manoj', 0, 'undefined'),
(10, '', 'manoj', 0, 'undefined'),
(11, '', 'manoj', 0, 'undefined'),
(12, '', 'manoj', 0, 'undefined'),
(13, '', 'manoj', 0, 'undefined'),
(14, '', 'manoj', 0, 'undefined'),
(15, '', 'manoj', 0, 'undefined'),
(16, '', 'manoj', 0, 'undefined'),
(17, '', 'manoj', 0, 'undefined'),
(18, '', 'manoj', 0, 'undefined'),
(19, '', 'manoj', 0, 'undefined'),
(20, '', 'manoj', 0, 'undefined'),
(21, '', 'manoj', 0, 'undefined');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
