import { forwardRef } from 'react';
import { useState } from 'react';
import img from '~/assets/img';
import classNames from 'classnames';
import styles from './Image.module.scss';
const Image = forwardRef(({ src, alt, className, fallback, ...props }, ref) => {
	const [fallBack, setFallBack] = useState('');

	const handleError = () => {
		setFallBack(fallBack ? img.logo : fallback);
	};
	return (
		<img
			className={classNames(styles.wrapper, className)}
			ref={ref}
			src={fallBack || src}
			alt={alt}
			{...props}
			onError={handleError}
		/>
	);
});

export default Image;
