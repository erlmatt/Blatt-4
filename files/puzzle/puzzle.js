document.addEventListener('DOMContentLoaded', () => {
    const puzzleSource = document.getElementById('puzzleSource');
    const puzzleCells = document.querySelectorAll('#puzzleTarget .puzzlePic');
    const images = puzzleSource.querySelectorAll('img');

    // Function to place image in the cell
    const placeImageInCell = (img, cell) => {
        // Remove any existing image in the cell
        if (cell.style.backgroundImage) {
            const previousImageSrc = cell.style.backgroundImage.slice(5, -2);
            const previousImage = document.createElement('img');
            previousImage.src = previousImageSrc;
            previousImage.dataset.id = previousImageSrc.split('/').pop(); // Set data-id for consistency
            puzzleSource.appendChild(previousImage);
        }
        cell.style.backgroundImage = `url(${img.src})`;
        img.remove();
    };

    // Check if all images are in correct positions
    const checkWinCondition = () => {
        let allCorrect = true;
        puzzleCells.forEach(cell => {
            const correctSrc = cell.getAttribute('data-result');
            const currentSrc = cell.style.backgroundImage.slice(5, -2); // Remove 'url()' wrapper
            if (currentSrc !== correctSrc) {
                allCorrect = false;
            }
        });

        // Show result message
        if (allCorrect) {
            alert('Congratulations! You solved the puzzle!');
        } else {
            alert('Some pieces are in the wrong position. Try again!');
        }
    };

    // Image click event to place in the corresponding cell
    images.forEach(img => {
        img.addEventListener('click', () => {
            const targetCell = Array.from(puzzleCells).find(cell =>
                cell.getAttribute('data-result') === img.dataset.id);
            if (targetCell) {
                placeImageInCell(img, targetCell);
                checkWinCondition();
            }
        });
    });

    // Click event on grid cells to remove the image
    puzzleCells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.style.backgroundImage) {
                const img = document.createElement('img');
                img.src = cell.style.backgroundImage.slice(5, -2);
                img.dataset.id = img.src.split('/').pop();
                puzzleSource.appendChild(img);
                cell.style.backgroundImage = '';
            }
        });
    });
});