import { Box, IconButton, styled, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
const NoHoverIconButton = styled(IconButton)({
    '&:hover': {
        backgroundColor: 'transparent',
    },
    marginRight: '10px',
    cursor:'default',
})
const Message = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    margin:'5px 0'
})
const MessageTop = styled(Box)({
    display: 'flex',
})
const MessageText = styled(Typography)({
    padding: '10px',
    borderRadius: '20px',
    backgroundColor: '#7151f4',
    color: 'white',
    maxWidth: '30%',
    textAlign:'center'
})
const MessageOwnTop = styled(Box)({
    display: 'flex',
    justifyContent:'flex-end'
})
const MessageShow = ({ message,own }) => {
    const UserBox = own ? MessageOwnTop : MessageTop;
    return (
       <Message>
            <UserBox>
                {!own && <NoHoverIconButton> <PersonIcon /> </NoHoverIconButton>}
                <MessageText>
                    {message}
                </MessageText>
                {own && <NoHoverIconButton> <PersonIcon /> </NoHoverIconButton>}
            </UserBox>
       </Message>
    )
}

export default MessageShow;