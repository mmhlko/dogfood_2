import ContentLoader from "react-content-loader"

export const CardPreloader = () => (
    <ContentLoader
            speed={2}
            width={186}
            height={385}
            viewBox="0 0 186 385"
            backgroundColor="#d4cece"
            foregroundColor="#dbdbdb"
        >
            <path d="M 0 0 h 185.6 v 187 H 0 z M 0 203 h 186 v 14 H 0 z M 0 233 h 186 v 56 H 0 z M 0 305 h 186 v 24 H 0 z" />
            <rect x="0" y="345" rx="20" ry="20" width="121" height="40" />
        </ContentLoader>
)