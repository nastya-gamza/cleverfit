import React from 'react';

type HighlightWordsProps = {
    text: string;
    searchWords: string;
    className: string | undefined;
}

export const HighlightWords = ({text, searchWords, className}: HighlightWordsProps) => {
    if (!searchWords?.trim()) return text;

    const searchWordsArray = searchWords?.split(' ');
    const searchRegex = new RegExp(`(${searchWordsArray.join('|')})`, 'gi');
    const parts = text?.split(searchRegex);

    return (
        <React.Fragment>
            {parts?.map((part) => {
                const isHighlighted = searchWordsArray?.some(word => part.toLowerCase().includes(word.toLowerCase()));

                return isHighlighted ?
                    <span className={className}>{part}</span> :
                    <span>{part}</span>;
            })}
        </React.Fragment>
    );
};
