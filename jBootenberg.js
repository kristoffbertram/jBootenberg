/**
 * jBootenberg.js
 * Adds necessary Bootstrap 4 classes to Gutenberg output.
 *
 * @version 1.3
 *
 * @since 1.3
 * Updated for WP 5.4
 * WP no longer uses the has-* row class, and has switched to flex-basis *
 *
 * @since 1.2.1
 * Fixed table
 *
 * @since 1.2.1
 * Added vertical alignment
 *
 * @since 1.2
 * Updated for WP 5.3
 * Started Documentation for this file
 *
 * @since 1.1
 * Initial development
 *
 */

console.info('jBootenberg: Loaded');

$.fn.jBootenberg = function(p = {}) {

    console.info('jBootenberg: Called');

    if (!(p.number_of_columns)) {

        /**
         * Bootstrap Default of 12 Columns
         */

        p.number_of_columns = 12;

    }

    /**
     * Attempts to give a logical bootstrap column class, depending on the number of columns in use.
     */

    $(this).find('.wp-block-columns').addClass('row');

    $(this).find('.wp-block-columns .wp-block-column').each(function (i,e) {

        var row = $(this).parents('.wp-block-columns');

        if ( $(this).parent().not($("[class~='col-']"))) {

            /**
             *
             * Add Columns based on flex-basis
             */

            var _flex_basis 	= $(this).css('flex-basis');

            if (_flex_basis.substr(-1) === "%" ) {

                _flex_basis 		= _flex_basis.slice(0,-1);

                var _col_number 	= Math.ceil( _flex_basis / 100 * p.number_of_columns );

                $(this).addClass('col-md-' + _col_number);

                $(this).css('flex-basis' , '');

                $(this).addClass('col-' + p.number_of_columns);

            }

            $(this).addClass('col');

            $(this).addClass('js--jb-col');

        }

        $(this).removeClass('wp-block-column');

    });

    $(this).find('.wp-block-columns').removeClass('wp-block-columns');

    /**
     *
     * @since 1.2
     * Gutenberg 5.3 Alignment
     */

    $(this).find('.is-vertically-aligned-bottom').each(function (i,e) {

        if ($(this).is(":not(.align-items-start , .align-items-center , .align-items-end)") ) {

            $(this).addClass('d-flex align-items-end');

        }

    });

    $(this).find('.is-vertically-aligned-center').each(function (i,e) {

        if ($(this).is(":not(.align-items-start , .align-items-center , .align-items-end)") ) {

            $(this).addClass('d-flex align-items-center');

        }

    });

    /**
     *
     * @since 1.1
     * Styles the button
     */

    $(this).find('.wp-block-button__link').each(function (i,e) {

        if ($(this).is(":not(.btn-primary , .btn-secondary , .btn-outline-primary , .btn-outline-secondary)") ) {

            $(this).addClass('btn btn-primary');

            if ( $(this).parent('.wp-block-button').hasClass('is-style-outline') ) {

                $(this).removeClass('btn-primary').addClass('btn btn-outline-primary');

            }

            $(this).removeClass('wp-block-button__link');

        }

    });

    /**
     *
     * @since 1.1
     * File button
     */

    $(this).find('.wp-block-file__button').addClass('btn btn-primary').removeClass('wp-block-file__button');

    /**
     *
     * @since 1.1
     * Table
     */

    $(this).find('.wp-block-table table').addClass('table');

}