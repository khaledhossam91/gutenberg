/**
 * External dependencies
 */
import { renderHook } from '@testing-library/react-native';

/**
 * Internal dependencies
 */
import { useEditorCanvasMargins } from '../use-editor-canvas-margins';

jest.mock( '../use-editor-canvas-margins.scss', () => ( {
	'block-editor-hooks__use-editor-canvas-margins': {
		width: '100%',
		maxWidth: 580,
		alignSelf: 'center',
	},
	'block-editor-hooks__use-editor-canvas-margins--reversed': {
		flexDirection: 'column-reverse',
		width: '100%',
		maxWidth: 580,
	},
	'block-editor-hooks__use-editor-canvas-margins-alignment--full': {
		maxWidth: '100%',
	},
	'block-editor-hooks__use-editor-canvas-margins-alignment--wide': {
		maxWidth: 1054,
	},
	'block-editor-hooks__use-editor-canvas-margins-alignment--wide-medium': {
		maxWidth: 770,
	},
	'block-editor-hooks__use-editor-canvas-margins-alignment--wide-landscape': {
		maxWidth: 662,
	},
} ) );

const defaultCanvasStyles = {
	width: '100%',
	maxWidth: 580,
	alignSelf: 'center',
};

describe( 'useEditorCanvasMargins', () => {
	it( 'should return the correct canvas margins for wide (medium) alignment', () => {
		// Arrange
		jest.spyOn(
			require( 'react-native' ),
			'useWindowDimensions'
		).mockReturnValue( { width: 800, height: 600 } );

		// Act
		const { result } = renderHook( () =>
			useEditorCanvasMargins( { align: 'wide' } )
		);

		// Assert
		expect( result.current[ 0 ] ).toEqual( [
			expect.objectContaining( defaultCanvasStyles ),
			expect.objectContaining( {
				maxWidth: 770,
			} ),
		] );
	} );

	it( 'should return the correct canvas margins for wide alignment', () => {
		// Arrange
		jest.spyOn(
			require( 'react-native' ),
			'useWindowDimensions'
		).mockReturnValue( { width: 1194, height: 834 } );

		// Act
		const { result } = renderHook( () =>
			useEditorCanvasMargins( { align: 'wide' } )
		);

		// Assert
		expect( result.current[ 0 ] ).toEqual( [
			expect.objectContaining( defaultCanvasStyles ),
			expect.objectContaining( {
				maxWidth: 662,
			} ),
		] );
	} );

	it( 'should return the correct canvas margins for full alignment', () => {
		// Arrange
		jest.spyOn(
			require( 'react-native' ),
			'useWindowDimensions'
		).mockReturnValue( { width: 800, height: 600 } );

		// Act
		const { result } = renderHook( () =>
			useEditorCanvasMargins( { align: 'full' } )
		);

		// Assert
		expect( result.current[ 0 ] ).toEqual( [
			expect.objectContaining( defaultCanvasStyles ),
			expect.objectContaining( {
				maxWidth: '100%',
			} ),
		] );
	} );

	it( 'should return the correct canvas margins for left alignment', () => {
		// Arrange
		jest.spyOn(
			require( 'react-native' ),
			'useWindowDimensions'
		).mockReturnValue( { width: 800, height: 600 } );

		// Act
		const { result } = renderHook( () =>
			useEditorCanvasMargins( { align: 'left' } )
		);

		expect( result.current[ 0 ] ).toEqual( [
			expect.objectContaining( defaultCanvasStyles ),
		] );
	} );

	it( 'should return the correct canvas margins for center alignment', () => {
		// Arrange
		jest.spyOn(
			require( 'react-native' ),
			'useWindowDimensions'
		).mockReturnValue( { width: 640, height: 960 } );

		// Act
		const { result } = renderHook( () =>
			useEditorCanvasMargins( { align: 'center' } )
		);

		expect( result.current[ 0 ] ).toEqual( [
			expect.objectContaining( defaultCanvasStyles ),
		] );
	} );

	it( 'should return the correct canvas margins for right alignment', () => {
		// Arrange
		jest.spyOn(
			require( 'react-native' ),
			'useWindowDimensions'
		).mockReturnValue( { width: 960, height: 640 } );

		// Act
		const { result } = renderHook( () =>
			useEditorCanvasMargins( { align: 'right' } )
		);

		expect( result.current[ 0 ] ).toEqual( [
			expect.objectContaining( defaultCanvasStyles ),
		] );
	} );

	it( 'should return the correct canvas margins when reversed is true', () => {
		// Arrange
		jest.spyOn(
			require( 'react-native' ),
			'useWindowDimensions'
		).mockReturnValue( { width: 800, height: 600 } );

		// Act
		const { result } = renderHook( () =>
			useEditorCanvasMargins( { reversed: true } )
		);

		expect( result.current[ 0 ] ).toEqual( [
			expect.objectContaining( {
				flexDirection: 'column-reverse',
				width: '100%',
				maxWidth: 580,
			} ),
		] );
	} );
} );
