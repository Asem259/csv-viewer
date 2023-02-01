import React, { useCallback } from "react";
import {
  Button,
  Flex,
  Group,
  List,
  LoadingOverlay,
  Paper,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeModal } from "../../store/uiSlice";
import { selectFileInfo, selectRowsTotal } from "../../store/gridSlice";
import { BsCheck, BsCheckCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ImportSuccessModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, size } = useAppSelector(selectFileInfo);
  const loading = useAppSelector((state) => state.grid.loading);
  const total = useAppSelector(selectRowsTotal);

  const onViewData = useCallback(() => {
    navigate("/d/" + name.slice(0, name.lastIndexOf(".")));
    dispatch(closeModal());
  }, [name, navigate, dispatch]);

  const onCancel = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <Paper mih="xl">
      <LoadingOverlay visible={loading} />
      {!loading && (
        <Flex gap="md" direction="column" justify="center" align="center">
          <ThemeIcon variant="light" radius="xl" size={64} color="teal">
            <BsCheckCircle size={48} />
          </ThemeIcon>
          <Title size="h3" fw="bolder" c="green">
            Import Successful!
          </Title>
          <Text w="100%" align="left">
            Data has been successfully imported.
          </Text>
          <List w="100%" icon={<BsCheck size={16} />}>
            <List.Item>
              <Text>File name: {name}.</Text>
            </List.Item>
            <List.Item>
              <Text>File Size: {size}.</Text>
            </List.Item>
            <List.Item>
              <Text>Rows: {total}.</Text>
            </List.Item>
          </List>
          <Group mt="md" mb="xs" w="100%" position="center" grow>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onViewData}>View Data </Button>
          </Group>
        </Flex>
      )}
    </Paper>
  );
};

export default ImportSuccessModal;
