document.addEventListener('DOMContentLoaded', () => {
    // Get all section headings (h1 elements within sections)
    const sections = document.querySelectorAll('section');
    const sectionHeadings = Array.from(sections).map(sec => sec.querySelector('h1'));

    // Create the form elements
    const form = document.createElement('form');
    const select = document.createElement('select');
    const textInput = document.createElement('input');
    const textarea = document.createElement('textarea');
    const submitButton = document.createElement('button');

    // Set attributes for the form elements
    textInput.type = 'text';
    textInput.placeholder = 'Section Heading';
    submitButton.textContent = 'Update Section';

    // Populate select options with section headings
    const updateSelectOptions = () => {
        select.innerHTML = ''; // Clear previous options
        sectionHeadings.forEach((heading, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = heading ? heading.textContent : `Section ${index + 1}`;
            select.appendChild(option);
        });
    };
    updateSelectOptions();

    // Append form elements
    form.appendChild(select);
    form.appendChild(textInput);
    form.appendChild(textarea);
    form.appendChild(submitButton);
    document.body.appendChild(form); // Place form after last section

    // Populate input and textarea when a section is selected
    select.addEventListener('change', () => {
        const selectedSectionIndex = select.value;
        const selectedSection = sections[selectedSectionIndex];
        const heading = selectedSection.querySelector('h1');
        
        // Update the text input and textarea
        textInput.value = heading ? heading.textContent : '';
        textarea.value = selectedSection.innerHTML;
    });

    // Update section content on form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedSectionIndex = select.value;
        const selectedSection = sections[selectedSectionIndex];

        // Update heading if present or create a new one if it was removed
        let heading = selectedSection.querySelector('h1');
        if (heading) {
            heading.textContent = textInput.value;
        } else {
            heading = document.createElement('h1');
            heading.textContent = textInput.value;
            selectedSection.prepend(heading);
        }

        // Update the inner HTML of the section with the textarea content
        selectedSection.innerHTML = textarea.value;
        selectedSection.prepend(heading); // Ensure heading is always at the top

        // Refresh select options with updated headings
        updateSelectOptions();
        submitButton.disabled = true; // Disable submit until a new selection
    });
});