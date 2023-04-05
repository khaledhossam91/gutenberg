/**
 * External dependencies
 */
import { useWindowDimensions } from 'react-native';

/**
 * WordPress dependencies
 */
import { useCallback, useMemo } from '@wordpress/element';
import { ALIGNMENT_BREAKPOINTS, WIDE_ALIGNMENTS } from '@wordpress/components';

/**
 * Internal dependencies
 */
import styles from './use-editor-canvas-margins.scss';

/**
 * A custom hook that handles the margins in the editor canvas,
 * including the margins, max width, and alignment based on the `align` prop.
 *
 * @param {Object}  props          An props object for the hook.
 * @param {string}  props.align    The alignment of the content.
 * @param {boolean} props.reversed Whether the content is reversed or not.
 *
 * @return {Array} An array of two style objects representing the canvas margins:
 *   The first element is the style for the canvas margins.
 *   The second element is the style for the content alignment.
 */
export function useEditorCanvasMargins( { align, reversed = false } = {} ) {
	const { width, height } = useWindowDimensions();
	const isLandscape = width >= height;

	const getWideStyles = useCallback( () => {
		if ( isLandscape && width > ALIGNMENT_BREAKPOINTS.large ) {
			return styles[
				'block-editor-hooks__use-editor-canvas-margins-alignment--wide-landscape'
			];
		}

		if ( width <= ALIGNMENT_BREAKPOINTS.small ) {
			return { maxWidth: width };
		}

		if (
			width >= ALIGNMENT_BREAKPOINTS.medium &&
			width < ALIGNMENT_BREAKPOINTS.wide
		) {
			return styles[
				'block-editor-hooks__use-editor-canvas-margins-alignment--wide-medium'
			];
		}
	}, [ isLandscape, width ] );

	const canvasMargins = useMemo( () => {
		const canvasStyles = ! reversed
			? styles[ 'block-editor-hooks__use-editor-canvas-margins' ]
			: styles[
					'block-editor-hooks__use-editor-canvas-margins--reversed'
			  ];

		const alignmentStyles =
			align === WIDE_ALIGNMENTS.alignments.wide
				? getWideStyles()
				: styles[
						`block-editor-hooks__use-editor-canvas-margins-alignment--${ align }`
				  ];

		return [ canvasStyles, alignmentStyles ];
	}, [ align, getWideStyles, reversed ] );

	return [ canvasMargins ];
}
