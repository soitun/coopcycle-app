import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, ArrowRightIcon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { greenColor, redColor, whiteColor } from '../../styles/common';
import { selectUser } from '../../redux/App/selectors';
import Avatar from '../../components/Avatar';
import ItemSeparatorComponent from '../../components/ItemSeparator';

export default function PickUser({ route }) {
  const { t } = useTranslation();
  const currentUser = useSelector(selectUser);
  const baseURL = useSelector(state => state.app.baseURL);
  const allUsers = useSelector(state => state.dispatch.users);

  const { onItemPress, showUnassignButton, onUnassignButtonPress, withSelfAssignBtn = true } = route.params ?? {};

  const users = useMemo(
    () => allUsers.filter(u => u.roles.includes('ROLE_COURIER') && u.username !== currentUser.username),
    [allUsers, currentUser.username],
  );

  const selfAssign = withSelfAssignBtn && currentUser.roles.includes('ROLE_COURIER');

  return (
    <View style={{ flex: 1 }}>
      {showUnassignButton && (
        <TouchableOpacity
          style={styles.unassignButton}
          onPress={() => onUnassignButtonPress()}
          testID="unassignTask">
          <Text style={styles.buttonText}>{t('DISPATCH_UNASSIGN')}</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={users}
        keyExtractor={item => item.username}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onItemPress(item)}
            testID={`assignTo:${item.username}`}
            style={styles.item}>
            <Avatar baseURL={baseURL} username={item.username} />
            <Text style={styles.itemText}>{item.username}</Text>
            <Icon as={ArrowRightIcon} size="sm" />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
      {selfAssign && (
        <TouchableOpacity
          style={styles.assignToMeButton}
          onPress={() => onItemPress(currentUser)}>
          <Text style={styles.buttonText}>{t('DISPATCH_ASSIGN_TO_ME')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  itemText: {
    flex: 1,
    paddingHorizontal: 10,
  },
  unassignButton: {
    alignItems: 'center',
    backgroundColor: redColor,
    padding: 20,
  },
  assignToMeButton: {
    alignItems: 'center',
    backgroundColor: greenColor,
    padding: 20,
  },
  buttonText: {
    color: whiteColor,
  },
});
