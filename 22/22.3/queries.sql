-- 1. --
SELECT * FROM owners o FULL JOIN vehicles v ON o.id = v.owner_id;

-- 2. --
SELECT o.first_name, o.last_name, COUNT(*) AS total_vehicles FROM owners o JOIN vehicles v ON o.id = v.owner_id GROUP BY o.id ORDER BY o.first_name;

-- 3. --
SELECT o.first_name, o.last_name, ROUND(AVG(price)) AS AVERAGE_PRICE, COUNT(owner_id) FROM owners o JOIN vehicles v ON o.id = v.owner_id GROUP BY o.id HAVING COUNT(owner_id) > 1 AND ROUND(AVG(price)) > 10000 ORDER BY first_name DESC;