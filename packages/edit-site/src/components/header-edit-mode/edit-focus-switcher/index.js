/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { useEffect, useRef } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../../store';
import { unlock } from '../../../private-apis';
import useEditedEntityRecord from '../../use-edited-entity-record';

// TODO: 'edit focus' could be confused with 'editor mode'
export default function EditFocusSwitcher() {
	const { postType, postId } = useSelect(
		( select ) => select( editSiteStore ).getEditedPostContext(),
		[]
	);
	const { hasResolved: hasPostResolved, editedRecord: post } =
		useEntityRecord( 'postType', postType, postId );
	const { isLoaded: isTemplateLoaded } = useEditedEntityRecord();

	const shownNotification = useRef( false );

	const { setEditFocus } = useDispatch( editSiteStore );

	const { editFocus } = useSelect(
		( select ) => ( {
			editFocus: unlock( select( editSiteStore ) ).getEditFocus(),
		} ),
		[]
	);

	const { createInfoNotice } = useDispatch( noticesStore );

	useEffect( () => {
		if ( editFocus === 'template' && ! shownNotification.current ) {
			shownNotification.current = true;
			createInfoNotice( 'You are editing a template', {
				type: 'snackbar',
				actions: [
					{
						label: 'Back to page',
						onClick: () => {
							setEditFocus( 'post' );
						},
					},
				],
			} );
		}
	}, [ editFocus, createInfoNotice, setEditFocus ] );

	if ( ! hasPostResolved && ! isTemplateLoaded ) {
		return;
	}

	return (
		<div className="edit-focus-switcher">
			<Button
				className={ editFocus === 'post' ? 'is-active' : '' }
				onClick={ () => setEditFocus( 'post' ) }
			>
				{ post.type }
			</Button>
			<Button
				className={ editFocus === 'template' ? 'is-active' : '' }
				onClick={ () => setEditFocus( 'template' ) }
			>
				Template
			</Button>
		</div>
	);
}
