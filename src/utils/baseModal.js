export function createModal({ id, title, bodyContent, footerButtons, onModalShow }) {
    // Check if modal already exists
    if (!document.getElementById(id)) {
        const modalHtml = `
            <div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="${id}Label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${id}Label">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${bodyContent}
                        </div>
                        <div class="modal-footer">
                            ${footerButtons.map(button => `
                                <button type="${button.type}" class="btn ${button.class}" ${button.dataDismiss ? `data-bs-dismiss="${button.dataDismiss}"` : ''} ${button.form ? `form="${button.form}"` : ''}>${button.text}</button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    } else {
        const modalElement = document.getElementById(id);
        modalElement.querySelector('.modal-title').innerHTML = title;
        modalElement.querySelector('.modal-body').innerHTML = bodyContent;
        modalElement.querySelector('.modal-footer').innerHTML = footerButtons.map(button => `
            <button type="${button.type}" class="btn ${button.class}" data-bs-dismiss="${button.dataDismiss}">${button.text}</button>
        `).join('');
    }


    const modalElement = document.getElementById(id);
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();

    if (onModalShow) onModalShow();
}