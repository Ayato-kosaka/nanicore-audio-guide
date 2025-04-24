import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useCallback,
} from 'react';
import { Portal, Dialog, Button, Paragraph } from 'react-native-paper';

/**
 * Dialog の表示制御用 Context の型定義。
 */
type DialogContextType = {
    /**
     * 任意のメッセージとボタンでダイアログを表示する。
     *
     * @param title - タイトル文字列
     * @param message - 本文メッセージ
     * @param onConfirm - 確定アクション
     */
    showDialog: (
        title: string,
        message: string,
        onConfirm?: () => void,
        options?: {
            okLabel?: string;
            cancelLabel?: string;
        }
    ) => void;

    /**
     * 現在表示中のダイアログを閉じる
     */
    hideDialog: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

/**
 * 🪟 DialogProvider
 *
 * アプリ全体で汎用的なモーダルダイアログを表示するための Provider。
 * - 任意のタイトル・メッセージと OK/Cancel ボタン
 * - react-native-paper の Dialog を利用
 */
export const DialogProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>();
    const [okLabel, setOkLabel] = useState<string>('OK');
    const [cancelLabel, setCancelLabel] = useState<string>('キャンセル');

    const showDialog = useCallback(
        (
            title: string,
            message: string,
            onConfirm?: () => void,
            options?: {
                okLabel?: string;
                cancelLabel?: string;
            }
        ) => {
            setTitle(title);
            setMessage(message);
            setOnConfirm(() => onConfirm);
            setOkLabel(options?.okLabel ?? 'OK');
            setCancelLabel(options?.cancelLabel ?? 'キャンセル');
            setVisible(true);
        },
        []
    );

    const hideDialog = useCallback(() => {
        setVisible(false);
        setTitle('');
        setMessage('');
        setOnConfirm(undefined);
    }, []);

    const handleConfirm = () => {
        hideDialog();
        onConfirm?.();
    };

    return (
        <DialogContext.Provider value={{ showDialog, hideDialog }}>
            {children}
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>{title}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{message}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>{cancelLabel}</Button>
                        <Button onPress={handleConfirm}>{okLabel}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </DialogContext.Provider>
    );
};

/**
 * useDialog フック
 *
 * - グローバルなダイアログを表示するためのカスタムフック
 * - 必ず DialogProvider 内で使用する必要あり
 */
export const useDialog = (): DialogContextType => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error(
            '[useDialog] This hook must be used within a <DialogProvider>.'
        );
    }
    return context;
};
