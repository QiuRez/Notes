import $ from 'jquery';
import { useEffect } from 'react';

export function NoteDelete(note_id, render) {

	const apiDeleteNoteUrl = `http://project/api/notes/delete.php`;

	var quest = confirm('Вы уверены? Восстановить заметку не получится');

	if (quest) {
		if (Delete()) {return true} else {return false};
	} else {
		return false;
	}
	

	function Delete() {

		const request = $.ajax({
			url: apiDeleteNoteUrl,
			method: 'GET',
			data: {note_id: note_id},
			success: function(response) {
				console.log('Delete Success');
				return true;
			},
			error: function(error) {
				console.log(error);
				return false
			}
		})

		if (request) {return true} else {return false};
	}


	
}