import { Drawer, RadioGroup, Radio, ButtonToolbar, Button, Placeholder } from 'rsuite';
import { useState } from 'react';

export default function DrawerButton () {
  const [backdrop] = useState('static');
  const [open, setOpen] = useState(false);

  return (
    <>
    
      <ButtonToolbar>
        <button className='addUser' onClick={() => setOpen(true)}><span className="icon-[wpf--add-user] w-8 h-8 text-center m-auto" /></button>
      </ButtonToolbar>
      <Drawer backdrop={backdrop} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)} appearance="primary">
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Placeholder.Paragraph />
        </Drawer.Body>
      </Drawer>
    </>
  );
};

